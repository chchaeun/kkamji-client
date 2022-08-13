import { setupServer } from "msw/node";
import { handlers } from "./comment-handlers";

export const server = setupServer(...handlers);
