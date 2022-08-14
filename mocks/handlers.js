import { rest } from "msw";

const BASE_URL = "https://dev.kkamjidot.com/v1";

const comments = [
  {
    commentId: 1,
    commentUserName: "유저1",
    commentContent: "어쩌고 저쩌고\n123123 입니다.",
    createdDate: "Thu, 11 Aug 2022 14:24:19 GMT",
    modifiedDate: "",
    isMine: false,
    isWriter: false,
  },
  {
    commentId: 2,
    commentUserName: "유저2",
    commentContent: "어쩌고 저쩌고\n123123 입니다.",
    createdDate: "Thu, 11 Aug 2022 14:24:19 GMT",
    modifiedDate: "Thu, 5 Aug 2022 14:24:19 GMT",
    isMine: false,
    isWriter: true,
  },
  {
    commentId: 3,
    commentUserName: "유저3",
    commentContent: "어쩌고 저쩌고\n123123 입니다.",
    createdDate: "Thu, 11 Aug 2022 14:24:19 GMT",
    modifiedDate: "Thu, 9 Aug 2022 14:24:19 GMT",
    isMine: true,
    isWriter: false,
  },
  {
    commentId: 4,
    commentUserName: "유저4",
    commentContent:
      "어쩌고 저쩌고\n123123 입니다.dsdsssaaaaaaasdfsd안녕하세요 hello world",
    createdDate: "Thu, 10 Aug 2022 14:24:19 GMT",
    modifiedDate: "",
    isMine: true,
    isWriter: true,
  },
];

export const handlers = [
  rest.get(`${BASE_URL}/quizzes/:qid/comments`, (req, res, ctx) => {
    console.log(comments);
    return res(ctx.status(200), ctx.json(comments));
  }),

  rest.post(`${BASE_URL}/quizzes/:qid/comments`, (req, res, ctx) => {
    comments.push(req.body);
    return res(ctx.status(201));
  }),
];
