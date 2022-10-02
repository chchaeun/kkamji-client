import { useMutation } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../api/my-api";
import { getCode } from "../api/session-code";
import { firebaseConfig } from "../utils/FirebaseConfig";

type LoginValidForm = {
  name: string;
  code: string;
};

function Login() {
  const router = useRouter();

  const { mutate: mutateLogin } = useMutation(
    async (loginBody: LoginValidForm) => {
      return await api.post("/user/login", loginBody);
    },
    {
      onSuccess: (res, req) => {
        sessionStorage.setItem("code", req.code);
        router.push("/");
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

  const onLoginValid: SubmitHandler<LoginValidForm> = async (data) => {
    const { name, code } = data;
    let loginBody = {
      name,
      code,
      token: "",
      platform: "",
    };

    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging();

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        console.log(currentToken);
        loginBody = {
          ...loginBody,
          token: currentToken,
        };
      })
      .catch((err) => {});

    mutateLogin(loginBody);
  };
  return (
    <div className="flex flex-col items-center gap-10 pt-20">
      <h1 className="text-4xl logo">깜지.</h1>
      <form
        onSubmit={handleSubmit(onLoginValid)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            이름
            <input
              type="text"
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </label>
          <em>{errors?.name?.message}</em>
          <label className="flex flex-col">
            코드
            <input
              type="password"
              {...register("code", {
                required: "코드를 입력해주세요.",
                minLength: { value: 4, message: "코드는 4자여야 합니다." },
                maxLength: { value: 4, message: "코드는 4자여야 합니다." },
              })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <em>{errors.code?.message}</em>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
