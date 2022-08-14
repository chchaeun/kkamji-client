import { IFetchChapter } from "../fetch-types";
import api from "../my-api";
import { getCode } from "../session-code";

export const fetchChapterDetail = async (idData: IFetchChapter) => {
  const { chapterId } = idData;
  api.defaults.headers.common["code"] = getCode() || "";
  const { data } = await api.get(`/chapters/${chapterId}`);
  return data;
};
