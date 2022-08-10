import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
type QuizValidForm = {
  title: string;
  content: string;
  image: FileList;
  answer: string;
  explanation: string;
  source: string;
};
function QuizWritePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuizValidForm>();

  

  const titleRef = useRef<string | null>(null);
  titleRef.current = watch("title");

  const contentRef = useRef<string | null>(null);
  contentRef.current = watch("content");

  const imageRef = useRef<FileList | null>(null);
  imageRef.current = watch("image");

  const answerRef = useRef<string | null>(null);
  answerRef.current = watch("answer");

  const explanationRef = useRef<string | null>(null);
  explanationRef.current = watch("explanation");

  const onQuizSubmitValid: SubmitHandler<QuizValidForm> = async (data) => {
    const { title, content, image, answer, explanation, source } = data;
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-20 m-auto sm:flex sm:flex-col">
      <div className="col-start-1 flex flex-col items-center gap-2 mt-10 sm:mt-0">
        <span className="text-lg">이번주 문제 제출 현황</span>
        <span className="grid grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((element, index) => (
            <span key={index}>
              {element < 3 ? (
                <Icon icon="clarity:pencil-solid" color="#000000" height="30" />
              ) : (
                <Icon icon="clarity:pencil-line" color="#000000" height="30" />
              )}
            </span>
          ))}
        </span>
      </div>
      <div className="col-start-2 col-span-3 flex flex-col gap-10 sm:gap-7 sm:w-4/5 h-screen bg-white py-10 px-20 sm:m-auto sm:px-0 sm:py-20">
        <h1 className="text-2xl">문제 제출</h1>
        <form
          onSubmit={handleSubmit(onQuizSubmitValid)}
          className="flex flex-col gap-8 pb-10 items-end"
        >
          <div className="flex flex-col w-full gap-2">
            <label>
              제목을 입력하세요. (키워드)
              <input
                type="text"
                {...register("title", { required: true })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.title && errors.title.type === "required" && (
              <em>제목은 필수 입력값입니다.</em>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              문제 내용을 입력하세요.
              <span>* 객관식의 경우 보기도 같이 입력해주세요.</span>
              <textarea
                rows={5}
                {...register("content", { required: true })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.content && errors.content.type === "required" && (
              <em>문제 내용은 필수 입력값입니다.</em>
            )}
            <div className="flex items-center w-full gap-3">
              <label
                htmlFor="upload-image"
                className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-sm font-bold text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              >
                이미지 첨부
              </label>
              {imageRef.current?.length > 0 && (
                <span>{imageRef.current[0].name}</span>
              )}
            </div>

            <input
              type="file"
              id="upload-image"
              accept="image/*"
              className="hidden"
              {...register("image")}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              정답을 입력하세요.
              <textarea
                {...register("answer", { required: true })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.answer && errors.answer.type === "required" && (
              <em>정답은 필수 입력값입니다.</em>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              해설을 입력하세요.
              <textarea
                rows={5}
                {...register("explanation", { required: true })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.explanation && errors.explanation.type === "required" && (
              <em>해설은 필수 입력값입니다.</em>
            )}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              해설에 대한 출처를 입력하세요. (선택)
              <span>* 예: 공학과컴퓨터2 교재 10p 3번째 줄</span>
              <textarea
                {...register("source")}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizWritePage;
