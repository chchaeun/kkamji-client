import { rest } from "msw";
import { formattingUrl } from "./formatting-url";
const quizzes = [
  {
    quizId: 0,
    quizTitle: "string",
    quizWeek: 0,
    quizCategory: "string",
    quizCreatedDate: "2022-08-23T05:34:14.781Z",
    quizModifiedDate: "2022-08-23T05:34:14.782Z",
    isMine: true,
    isSolved: true,
    isGraded: true,
    writerName: "string",
    challengeId: 0,
  },
  {
    quizId: 1,
    quizTitle: "string1",
    quizWeek: 0,
    quizCategory: "string",
    quizCreatedDate: "2022-08-23T05:34:14.781Z",
    quizModifiedDate: "2022-08-23T05:34:14.782Z",
    isMine: true,
    isSolved: true,
    isGraded: true,
    writerName: "string",
    challengeId: 0,
  },
];

const myQuizzes = [
  {
    quizId: 0,
    quizTitle: "my",
    quizWeek: 0,
    quizCategory: "string",
    quizCreatedDate: "2022-08-23T05:34:14.781Z",
    quizModifiedDate: "2022-08-23T05:34:14.782Z",
    isMine: true,
    isSolved: true,
    isGraded: true,
    writerName: "string",
    challengeId: 0,
  },
  {
    quizId: 1,
    quizTitle: "my1",
    quizWeek: 0,
    quizCategory: "string",
    quizCreatedDate: "2022-08-23T05:34:14.781Z",
    quizModifiedDate: "2022-08-23T05:34:14.782Z",
    isMine: true,
    isSolved: true,
    isGraded: true,
    writerName: "string",
    challengeId: 0,
  },
];

let quizDetail = {
  quizId: 0,
  quizTitle: "string",
  quizWeek: 0,
  quizCategory: "string",
  quizContent: "string",
  quizAnswer: "string",
  quizExplanation: "string",
  quizRubric: JSON.stringify([
    { score: 10, content: "string" },
    { score: 5, content: "string" },
  ]),
  quizSource: "string",
  quizCreatedDate: "2022-08-24T11:58:39.828Z",
  quizModifiedDate: "2022-08-24T11:58:39.828Z",
  isMine: true,
  solveAnswer: null,
  solveScore: null,
  writerName: "string",
  challengeId: 0,
  quizFiles: [
    {
      id: 0,
      qfName: "string",
      qfType: "string",
      qfPath:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      qfCreatedDate: "2022-08-24T11:58:39.828Z",
      qfModifiedDate: "2022-08-24T11:58:39.828Z",
    },
  ],
};

export const quizzesHandlers = [
  rest.get(formattingUrl("/challenges/:cid/quizzes"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizzes));
  }),
  rest.get(formattingUrl("/quizzes/:qid"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizDetail));
    // return res(ctx.status(403, "권한이 없는 페이지입니다."));
  }),

  rest.post(formattingUrl("/quizzes/:qid/solve"), (req, res, ctx) => {
    quizDetail = {
      quizId: 0,
      quizTitle: "string",
      quizWeek: 0,
      quizCategory: "string",
      quizContent: "string",
      quizAnswer: "string",
      quizExplanation: "string",
      quizRubric: JSON.stringify([
        { score: 10, content: "string" },
        { score: 5, content: "string" },
      ]),
      quizSource: "string",
      quizCreatedDate: "2022-08-24T11:58:39.828Z",
      quizModifiedDate: "2022-08-24T11:58:39.828Z",
      isMine: true,
      solveAnswer: req.body.answer,
      solveScore: 0,
      writerName: "string",
      challengeId: 0,
      quizFiles: [
        {
          id: 0,
          qfName: "string",
          qfType: "string",
          qfPath:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
          qfCreatedDate: "2022-08-24T11:58:39.828Z",
          qfModifiedDate: "2022-08-24T11:58:39.828Z",
        },
      ],
    };
    return res(ctx.status(201));
  }),

  rest.get(formattingUrl("/quizzes/:qid/solve/my"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ answer: "나의 답" }));
  }),

  rest.get(formattingUrl("/challenges/:cid/my/quizzes"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myQuizzes));
  }),

  rest.post(formattingUrl("quizzes/:qid/grade"), (req, res, ctx) => {
    quizDetail = {
      quizId: 0,
      quizTitle: "string",
      quizWeek: 0,
      quizCategory: "string",
      quizContent: "string",
      quizAnswer: "string",
      quizExplanation: "string",
      quizRubric: JSON.stringify([
        { score: 10, content: "string" },
        { score: 5, content: "string" },
      ]),
      quizSource: "string",
      quizCreatedDate: "2022-08-24T11:58:39.828Z",
      quizModifiedDate: "2022-08-24T11:58:39.828Z",
      isMine: true,
      solveAnswer: req.body.answer,
      solveScore: req.body.score,
      writerName: "string",
      challengeId: 0,
      quizFiles: [
        {
          id: 0,
          qfName: "string",
          qfType: "string",
          qfPath:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
          qfCreatedDate: "2022-08-24T11:58:39.828Z",
          qfModifiedDate: "2022-08-24T11:58:39.828Z",
        },
      ],
    };
    return res(ctx.status(201));
  }),
];
