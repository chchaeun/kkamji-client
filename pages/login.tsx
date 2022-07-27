import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../api/my-api";

interface IValidForm {
  username: string;
  code: string;
}
interface IInvalidForm {
  username: {
    type: string;
    message: string;
  };
  code: {
    type: string;
    message: string;
  };
}

function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (sessionStorage.getItem("code")) {
      router.push("/");
    }
  }, [router]);

  const onValid = async ({ username, code }: IValidForm) => {
    const loginBody = {
      username,
      code,
    };
    await api
      .post("/login", loginBody)
      .then((res) => {
        sessionStorage.setItem("code", code);
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onInvalid = ({ username, code }: IInvalidForm) => {
    if (username) {
      alert(username.message);
    } else if (code) {
      alert(code.message);
    }
  };
  return (
    <div className="flex flex-col items-center pt-20 gap-10">
      <h1 className="font-summer text-4xl">깜지.</h1>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            이름
            <input
              type="text"
              {...register("username", {
                required: "이름을 입력해주세요.",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="flex flex-col">
            코드
            <input
              type="password"
              {...register("code", {
                required: "코드를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "코드는 4자여야 합니다.",
                },
                maxLength: {
                  value: 4,
                  message: "코드는 4자여야 합니다.",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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
