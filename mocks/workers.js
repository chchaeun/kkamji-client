import { setupWorker } from "msw";
import { handlers } from "./comment-handlers";

export const worker = setupWorker(...handlers);
