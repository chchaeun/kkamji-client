import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { NotionRenderer, BlockMapType } from "react-notion";
import "react-notion/src/styles.css";
import HeadTitle from "../components/common/HeadTitle";
function Introduce() {
  const { data: introduceKkamji } = useQuery<BlockMapType>(
    ["introduceKkamji"],
    async () => {
      const NOTION_PAGE_ID = "747a3d6548c14b55b2028f0696f088fb";
      const { data } = await axios.get(
        `https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`
      );
      return data;
    }
  );
  return (
    <>
      <HeadTitle name="문제 제출 매뉴얼 : 깜지" />
      <div className="flex flex-col items-center  py-[80px] px-[200px] sm:px-[12px]">
        <h1 className="text-2xl font-bold sm:ml-3">
          🌟 깜지 문제 제출 매뉴얼 🌟
        </h1>
        {introduceKkamji && (
          <NotionRenderer blockMap={introduceKkamji} fullPage={true} />
        )}
      </div>
    </>
  );
}

export default Introduce;
