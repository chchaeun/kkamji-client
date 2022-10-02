import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Icon } from "@iconify/react";
import useSubmitCountQuery from "../../../../hooks/submit-count-query";

interface Props {
  week: number;
}

function SubmitSuccessModal({ week }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const { data: submitCount } = useSubmitCountQuery();

  const onAgainClick = () => {
    router.reload();
  };

  const onMainClick = () => {
    router.push(`/challenges/${challengeId}`);
  };

  return (
    <>
      {submitCount && (
        <div className="grid grid-rows-6 grid-cols-10 items-center justify-center gap-5 fixed w-2/5 h-1/3  sm:w-3/4 sm:h-2/5 left-1/2 top-1/4 -translate-x-1/2 bg-white rounded-lg z-10 animate-in fade-in-10">
          <Icon
            icon="bi:x-lg"
            color="black"
            height="30"
            onClick={onMainClick}
            className="row-start-1 col-start-10 sm:col-start-9  mt-5 cursor-pointer"
          />
          <p className="row-start-3 col-start-3 col-span-6 sm:col-start-2 sm:col-span-8 flex flex-col items-center sm:items-start text-lg sm:text-base">
            <span>문제가 제출되었습니다.</span>
            {submitCount >= 2 ? (
              <span>
                이번주 미션을 모두 완료했습니다.
                <br />
                고생 많으셨습니다!
              </span>
            ) : (
              <span>
                이번주 미션 완료까지 {2 - submitCount} 문제 남았습니다!
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={onAgainClick}
            className="row-start-5 col-start-4 col-span-4 sm:col-start-3 sm:col-span-6 bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            한 문제 더 제출하기
          </button>
        </div>
      )}
    </>
  );
}

export default SubmitSuccessModal;
