import { useQuery } from "@tanstack/react-query";
import { Comment } from "../../types/Comment";
import { fetchData } from "../utils/fetchData";
import { quizCommentsUrl } from "./paths";

interface Props {
  quizId: string;
  suspense?: boolean;
}

function useCommentsQuery({ quizId, suspense = false }: Props) {
  return useQuery<Comment[]>(
    [quizCommentsUrl({ quizId })],
    () => fetchData({ url: quizCommentsUrl({ quizId }) }),
    {
      enabled: !!quizId,
    }
  );
}

export { useCommentsQuery };
