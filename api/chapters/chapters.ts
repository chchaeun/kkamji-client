import api from "../my-api";
import { getCode } from "../session-code";

export interface IChapter {
  chapterId: number;
  chapterName: string;
  chapterStartDate: string;
  chapterEndDate: string;
  isReadable: boolean;
}

export const fetchChapters = async () => {
  api.defaults.headers.common["code"] = getCode() || "";
  const { data } = await api.get("/chapters");
  return data;
};
