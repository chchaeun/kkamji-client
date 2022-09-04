import { rest } from "msw";
import { formattingUrl } from "./formatting-url";

let submitCount = {
  count: 0,
  challengeId: 0,
  week: 0,
};
export const quizSubmitHandlers = [
  rest.post(formattingUrl("/challenges/:cid/quizzes"), (req, res, ctx) => {
    submitCount = {
      count: 1,
      challengeId: 0,
      week: 0,
    };
    return res(ctx.status(201));
  }),

  rest.get(
    formattingUrl("/challenges/:cid/my/quizzes/count"),
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(submitCount));
    }
  ),
];
