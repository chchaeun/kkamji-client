import { setupServer } from "msw/node";
import { challengesHandlers } from "./challenges-handlers";
import { commentsHandlers } from "./comments-handlers";

export const server = setupServer(...commentsHandlers, ...challengesHandlers);
