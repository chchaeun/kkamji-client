import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { postLogin } from "../api/auth";
import { getJwtToken } from "../api/utils/getJwtToken";
import HeadTitle from "../components/common/HeadTitle";
import { media } from "../styles/media";
import { firebaseConfig } from "../utils/FirebaseConfig";

type LoginValidForm = {
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
  fcmToken: string | null;
  platform: string;
};

interface LoginProps {
  loginBody: LoginBody;
}

function Login() {
  const router = useRouter();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isUser = getJwtToken();

  if (isUser) {
    router.push("/");
  }

  const onAutoLoginClick = () => {
    setIsAutoLogin((prev) => !prev);
  };

  const { mutate: mutateLogin } = useMutation(
    ({ loginBody }: LoginProps) => postLogin(loginBody),
    {
      onSuccess: (res, req) => {
        if (isAutoLogin) {
          localStorage.setItem("token", res.data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", res.data.token);
          localStorage.removeItem("token");
        }
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
    resetField,
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
    const { email, password } = data;

    if (password.length === 4) {
      router.push("/password-notice");
    } else {
      let loginBody: LoginBody = {
        email,
        password,
        fcmToken,
        platform: navigator.platform,
      };
      mutateLogin({ loginBody });
    }
  };
  return (
    <>
      <HeadTitle name="로그인 : 깜지" />
      <Background>
        <Container>
          <Link href={"/"}>
            <Logo className="logo" role="button">
              깜지.
            </Logo>
          </Link>
          <Form onSubmit={handleSubmit(onLoginValid)}>
            <Block>
              <Title>이메일</Title>
              <TextInputLabel>
                <Input
                  type="text"
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "이메일은 형식에 맞아야 합니다.",
                    },
                  })}
                  isError={Boolean(errors.email)}
                  placeholder={"이메일 주소"}
                />
                <button type="button" onClick={() => resetField("email")}>
                  <Icon icon="heroicons:x-mark-20-solid" color="#9ca3af" />
                </button>
              </TextInputLabel>
              {errors?.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </Block>
            <Block>
              <Title>비밀번호</Title>
              <TextInputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                  isError={Boolean(errors.password)}
                  placeholder={"비밀번호"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Icon icon="heroicons:eye" color="#9ca3af" />
                  ) : (
                    <Icon icon="heroicons:eye-slash-20-solid" color="#9ca3af" />
                  )}
                </button>
              </TextInputLabel>
              {errors?.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </Block>
            <CheckboxLabel>
              <input type="checkbox" style={{ display: "none" }} />
              <button type="button">
                {isAutoLogin ? (
                  <Icon
                    icon="mingcute:check-circle-fill"
                    color="#6366f1"
                    onClick={onAutoLoginClick}
                  />
                ) : (
                  <Icon
                    icon="uil:check-circle"
                    color="#d1d5db"
                    onClick={onAutoLoginClick}
                  />
                )}
              </button>
              <span onClick={onAutoLoginClick}>자동 로그인</span>
            </CheckboxLabel>
            <FormButton>로그인</FormButton>
          </Form>
          {/* To Do: 회원가입 */}
        </Container>
      </Background>
    </>
  );
}

export default Login;

const Background = styled.div`
  padding: 90px;

  height: 100vh;
  background-color: #f8fafc;

  ${media.medium`
    padding: 12px;
  `}
`;

const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  padding: 66px 104px;

  width: 512px;
  margin: 0 auto;

  background-color: #ffffff;

  ${media.medium`
    width: 100%;
    padding: 24px 16px 36px 16px;
  `}
`;

const Logo = styled.h1`
  font-size: 40px;
  font-family: "HSSummer";

  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;

  width: 100%;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: 3px 0px;
`;

const Title = styled.h3`
  display: flex;
  gap: 4px;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #111827;

  span {
    position: relative;
    bottom: 2px;

    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    color: #ef4444;
  }
`;

const TextInputLabel = styled.label`
  position: relative;
  button {
    position: absolute;
    top: 20px;
    right: 15px;

    svg {
      font-size: 18px;
    }
  }
`;

const Input = styled.input<{ isError: boolean }>`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  width: 100%;
  margin-top: 4px;

  background: #ffffff;

  border: 1px solid ${(p) => (p.isError ? "#EF4444" : "#e5e7eb")};
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &:focus {
    outline: none;
    border: 1px solid ${(p) => (p.isError ? "#EF4444" : "#6366f1")};
  }
`;

const FormButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;

  width: 100%;
  margin: 8px 0px;

  background: #4f46e5;
  cursor: pointer;

  border-radius: 12px;

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  color: #ffffff;

  &:hover {
    background: #4338ca;
    cursor: pointer;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 4px;
  align-items: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #1f2937;

  svg {
    font-size: 18px;
    cursor: pointer;
  }

  span {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  width: fit-content;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #ef4444;
`;
