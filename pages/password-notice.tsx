import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import HeadTitle from "../components/common/HeadTitle";

type PasswordValidForm = {
  password: string;
  passwordConfirm: string;
};

function PasswordNoticePage() {
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

  const passwordField = watch("password");

  console.log(passwordField);

  const onPasswordValid: SubmitHandler<PasswordValidForm> = async (data) => {
    const { password, passwordConfirm } = data;

    if (password === passwordConfirm) {
      // mutatePasswordChange(data);
    } else {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }
  };

  return (
    <>
      <HeadTitle name="비밀번호 변경 : 깜지" />
      <div className="flex flex-col items-center gap-10 px-40 pt-20">
        <h2 className="text-2xl font-bold">로그인 방식이 변경됩니다.</h2>
        <p>
          회원님들의 소중한 개인정보를 보호하기 위해 로그인 방식이 변경됩니다.
          다음 로그인부터는 안내드린 이메일과 함께 새 비밀번호로 로그인해주시길
          바랍니다. 감사합니다.
        </p>
        <form
          onSubmit={handleSubmit(onPasswordValid)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <label className="flex flex-col">
              새 비밀번호
              <div className="flex">
                <input
                  type={showPassword ? inputType.text : inputType.password}
                  {...register("password", {
                    required: "새 비밀번호를 입력해주세요.",
                    minLength: {
                      value: 8,
                      message: "최소 8자 이상의 비밀번호를 입력해주세요.",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-zA-zS]).{8,}/,
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
              <em>{errors.password?.message}</em>
            </label>
            <label className="flex flex-col">
              새 비밀번호 확인
              <div className="flex">
                <input
                  type={
                    showPasswordConfirm ? inputType.text : inputType.password
                  }
                  {...register("passwordConfirm", {
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
              <em>{errors.passwordConfirm?.message}</em>
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
