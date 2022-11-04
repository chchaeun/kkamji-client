import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiV1 } from "../api/utils/myApi";
import HeadTitle from "../components/common/HeadTitle";

type PasswordValidForm = {
  email: string;
  existingPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

function PasswordNoticePage() {
  const router = useRouter();

  const inputType = {
    password: "password",
    text: "text",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  const onShowPasswordConfirmClick = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordValidForm>();

  const passwordField = watch("newPassword");

  const { mutate: mutatePasswordChange } = useMutation(
    async (passwordChangeBody: PasswordValidForm) => {
      return await apiV1.patch("/users/password", passwordChangeBody);
    },
    {
      onSuccess: () => {
        router.push("/login");
      },
      onError: () => {
        alert("비밀번호 변경에 실패했습니다. 입력한 정보를 확인해주세요.");
      },
    }
  );

  const onPasswordValid: SubmitHandler<PasswordValidForm> = async (
    passwordChangeBody
  ) => {
    const { newPassword, newPasswordConfirm } = passwordChangeBody;

    if (newPassword === newPasswordConfirm) {
      mutatePasswordChange(passwordChangeBody);
    } else {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }
  };

  return (
    <>
      <HeadTitle name="비밀번호 변경 : 깜지" />
      <div className="flex flex-col items-center gap-10 px-40 pt-20 sm:px-10">
        <h2 className="text-2xl font-bold">비밀번호를 변경해주세요.</h2>
        <p>
          회원님들의 소중한 개인정보를 보호하기 위해 로그인 방식이 변경됩니다.
          다음 로그인부터는 새 비밀번호로 로그인해주시길 바랍니다. 감사합니다.
        </p>
        <form
          onSubmit={handleSubmit(onPasswordValid)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <label>
              이메일
              <div className="flex">
                <input
                  type={"email"}
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                  })}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
            </label>
            <label>
              기존 비밀번호
              <div className="flex">
                <input
                  type="password"
                  {...register("existingPassword", {
                    required: "기존 비밀번호를 입력해주세요.",
                    minLength: {
                      value: 4,
                      message: "기존 비밀번호는 4자입니다.",
                    },
                    maxLength: {
                      value: 4,
                      message: "기존 비밀번호는 4자입니다.",
                    },
                  })}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
            </label>
            <label className="flex flex-col">
              새 비밀번호
              <div className="flex">
                <input
                  type={showPassword ? inputType.text : inputType.password}
                  {...register("newPassword", {
                    required: "새 비밀번호를 입력해주세요.",
                    minLength: {
                      value: 8,
                      message: "최소 8자 이상의 비밀번호를 입력해주세요.",
                    },
                    maxLength: {
                      value: 255,
                      message: "비밀번호는 255자를 초과하면 안됩니다.",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[A-Za-z])[\40-\176]{8,255}$/,
                      message: "영문, 숫자를 혼용하여 입력해주세요.",
                    },
                  })}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={onShowPasswordClick}
                  type="button"
                  className="px-2"
                >
                  {showPassword ? (
                    <Icon icon="ant-design:eye-filled" color="#696969" />
                  ) : (
                    <Icon
                      icon="ant-design:eye-invisible-filled"
                      color="#696969"
                    />
                  )}
                </button>
              </div>
              <em>{errors.newPassword?.message}</em>
            </label>
            <label className="flex flex-col">
              새 비밀번호 확인
              <div className="flex">
                <input
                  type={
                    showPasswordConfirm ? inputType.text : inputType.password
                  }
                  {...register("newPasswordConfirm", {
                    required: "새 비밀번호 확인을 입력해주세요.",
                    validate: (value) =>
                      value === passwordField ||
                      "비밀번호와 비밀번호 확인이 다릅니다.",
                  })}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={onShowPasswordConfirmClick}
                  type="button"
                  className="px-2"
                >
                  {showPasswordConfirm ? (
                    <Icon icon="ant-design:eye-filled" color="#696969" />
                  ) : (
                    <Icon
                      icon="ant-design:eye-invisible-filled"
                      color="#696969"
                    />
                  )}
                </button>
              </div>
              <em>{errors.newPasswordConfirm?.message}</em>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </>
  );
}

export default PasswordNoticePage;
