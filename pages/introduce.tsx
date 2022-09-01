import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { NotionRenderer, BlockMapType } from "react-notion";
import "react-notion/src/styles.css";
function Introduce() {
  const { data: introduceKkamji } = useQuery<BlockMapType>(
    ["introduceKkamji"],
    async () => {
      const NOTION_PAGE_ID = "70d15d1ce789464bb42b141506cda3ab";
      const { data } = await axios.get(
        `https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`
      );
      return data;
    }
  );
  return (
    <div className="sm:mx-5 mt-10">
      <h1 className="font-bold text-2xl lg:hidden sm:ml-3">깜지 소개</h1>
      {introduceKkamji && (
        <NotionRenderer blockMap={introduceKkamji} fullPage={true} />
      )}
    </div>
  );
}

export default Introduce;