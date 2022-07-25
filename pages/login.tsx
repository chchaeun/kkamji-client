import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api/myApi";

interface IValidForm {
  name: string;
  code: string;
}
interface IInvalidForm {
  name: {
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

  const onValid = async ({ name, code }: IValidForm) => {
    const loginBody = {
      name,
      code,
    };
    await api
      .post("/login", loginBody)
      .then((res) => {
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("code", code);
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onInvalid = ({ name, code }: IInvalidForm) => {
    if (name) {
      alert(name.message);
    } else if (code) {
      alert(code.message);
    }
  };
  return (
    <div>
      <h1>깜지.</h1>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <label>
          이름
          <input
            type="text"
            {...register("name", {
              required: "이름을 입력해주세요.",
            })}
          />
        </label>
        <label>
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
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
