import { useMutation } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postLogin } from "../api/auth";
import HeadTitle from "../components/common/HeadTitle";
import { firebaseConfig } from "../utils/FirebaseConfig";

type LoginValidForm = {
  email: string;
  password: string;
  isAutoLogin: boolean;
};

type LoginBody = {
  email: string;
  password: string;
  fcmToken: string | null;
  platform: string;
};

interface LoginProps {
  loginBody: LoginBody;
  isAutoLogin: boolean;
}

function Login() {
  const router = useRouter();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const { mutate: mutateLogin } = useMutation(
    ({ loginBody }: LoginProps) => postLogin(loginBody),
    {
      onSuccess: (res, req) => {
        if (req.isAutoLogin) {
          localStorage.setItem("token", res.data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", res.data.token);
          localStorage.removeItem("token");
        }
        router.push("/dashboard");
      },
      onError: () => {
        alert("로그인에 실패했습니다.");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidForm>();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging();

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        setFcmToken(currentToken);
      })
      .catch((err) => {});
  }, []);

  const onLoginValid: SubmitHandler<LoginValidForm> = async (data) => {
    const { email, password, isAutoLogin } = data;

    if (password.length === 4) {
      router.push("/password-notice");
    } else {
      let loginBody: LoginBody = {
        email,
        password,
        fcmToken,
        platform: navigator.platform,
      };
      mutateLogin({ loginBody, isAutoLogin });
    }
  };
  return (
    <>
      <HeadTitle name="로그인 : 깜지" />
      <div className="flex flex-col items-center gap-10 pt-20">
        <h1 className="text-4xl logo">깜지.</h1>
        <form
          onSubmit={handleSubmit(onLoginValid)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <label className="flex flex-col">
              이메일
              <input
                type="text"
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                })}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </label>
            <em>{errors?.email?.message}</em>
            <label className="flex flex-col">
              비밀번호
              <input
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <em>{errors.password?.message}</em>
            </label>
          </div>
          <label className="flex gap-2">
            <input type="checkbox" {...register("isAutoLogin")} />
            자동 로그인
          </label>
          <button
            type="submit"
            className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
