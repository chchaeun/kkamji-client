import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../api/my-api";
import { getCode } from "../api/session-code";

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
    const loginBody = {
      name,
      code,
    };
    mutateLogin(loginBody);
  };
  return (
    <div className="flex flex-col items-center pt-20 gap-10">
      <h1 className="logo text-4xl">깜지.</h1>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
