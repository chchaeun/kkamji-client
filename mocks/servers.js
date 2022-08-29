import { setupServer } from "msw/node";
import { challengesHandlers } from "./challenges-handlers";
import { commentsHandlers } from "./comments-handlers";
import { quizSubmitHandlers } from "./quiz-submit-handlers";
import { quizzesHandlers } from "./quizzes-handlers";

export const server = setupServer(
  ...commentsHandlers,
  ...challengesHandlers,
  ...quizSubmitHandlers,
  ...quizzesHandlers
);
