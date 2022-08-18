import { setupWorker } from "msw";
import { challengesHandlers } from "./challenges-handlers";
import { commentsHandlers } from "./comments-handlers";

export const worker = setupWorker(...commentsHandlers, ...challengesHandlers);
