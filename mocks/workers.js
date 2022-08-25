import { setupWorker } from "msw";
import { challengesHandlers } from "./challenges-handlers";
import { commentsHandlers } from "./comments-handlers";
import { quizSubmitHandlers } from "./quiz-submit-handlers";
import { quizzesHandlers } from "./quizzes-handlers";

export const worker = setupWorker(
  ...commentsHandlers,
  ...challengesHandlers,
  ...quizSubmitHandlers,
  ...quizzesHandlers
);
