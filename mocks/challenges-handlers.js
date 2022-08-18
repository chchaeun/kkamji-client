import { rest } from "msw";

const BASE_URL = "https://dev.kkamjidot.com/v1";

const challenges = [
  {
    challengeId: 1,
    challengeTitle: "[단국대] 시스템프로그래밍 챌린지",
    challengeImage:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80",
  },
  {
    challengeId: 2,
    challengeTitle: "[단국대] 운영체제 챌린지",
    challengeImage:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },

  {
    challengeId: 3,
    challengeTitle: "[서울시립대] 공학과 컴퓨터2 챌린지",
    challengeImage:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
];

export const challengesHandlers = [
  rest.get(`${BASE_URL}/challenges`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(challenges));
  }),
];
