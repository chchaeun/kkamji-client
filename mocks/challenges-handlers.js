import { rest } from "msw";
import { formattingUrl } from "./formatting-url";
const BASE_URL = "https://dev.kkamjidot.com/v1";

const challenges = [
  {
    challengeId: 0,
    title: "string",
    description: "string",
    totalWeeks: 0,
    minNumOfQuizzesByWeek: 0,
    cost: 0,
    university: "string",
    department: "string",
    professorName: "string",
    chapter: 0,
    target: "string",
    startDate: "2022-08-23T04:59:55.645Z",
    endDate: "2022-08-23T04:59:55.645Z",
    applicationStartDate: "2022-08-23T04:59:55.645Z",
    applicationEndDate: "2022-08-23T04:59:55.645Z",
    detail: "string",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80",
    createdDate: "2022-08-23T04:59:55.645Z",
    modifiedDate: "2022-08-23T04:59:55.645Z",
    isParticipated: true,
  },
  {
    challengeId: 74866388,
    title: "sint",
    description: "dolor cillum labo",
    totalWeeks: -80448097,
    minNumOfQuizzesByWeek: 19264340,
    cost: 91859804,
    university: "cupidatat ut occaecat enim",
    department: "quis aliqua eu",
    professorName: "occa",
    chapter: -15420603,
    target: "proident",
    startDate: "1973-12-11T18:07:24.607Z",
    endDate: "2010-05-06T22:31:41.946Z",
    applicationStartDate: "1965-05-13T00:00:36.235Z",
    applicationEndDate: "1957-03-12T23:37:46.120Z",
    detail: "fugiat proident",
    imageUrl:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80",
    createdDate: "1970-09-04T19:37:32.171Z",
    modifiedDate: "2007-12-07T11:42:23.184Z",
    isParticipated: true,
  },
  {
    challengeId: 11386479,
    title: "",
    description: "ut officia elit ipsum cupidatat",
    totalWeeks: 97660394,
    minNumOfQuizzesByWeek: 85942490,
    cost: 93805265,
    university: "occaecat aliqua commodo tempor nisi",
    department: "veniam non deserunt",
    professorName: "laboris sunt esse",
    chapter: 41027926,
    target: "nulla dolore",
    startDate: "1973-03-24T10:08:45.890Z",
    endDate: "1953-09-18T23:19:36.805Z",
    applicationStartDate: "2015-01-14T05:25:00.059Z",
    applicationEndDate: "1973-07-16T19:06:03.108Z",
    detail: "aliquip occaecat",
    imageUrl:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    createdDate: "1963-01-13T10:55:32.988Z",
    modifiedDate: "2018-05-28T20:08:49.513Z",
    isParticipated: false,
  },
];

const myChallenges = [
  {
    challengeId: 74866388,
    title: "sint",
    description: "dolor cillum labo",
    totalWeeks: 15,
    minNumOfQuizzesByWeek: 19264340,
    cost: 91859804,
    university: "cupidatat ut occaecat enim",
    department: "quis aliqua eu",
    professorName: "occa",
    chapter: -15420603,
    target: "proident",
    startDate: "1973-12-11T18:07:24.607Z",
    endDate: "2010-05-06T22:31:41.946Z",
    applicationStartDate: "1965-05-13T00:00:36.235Z",
    applicationEndDate: "1957-03-12T23:37:46.120Z",
    detail: "fugiat proident",
    imageUrl:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80",
    createdDate: "1970-09-04T19:37:32.171Z",
    modifiedDate: "2007-12-07T11:42:23.184Z",
    isParticipated: true,
  },
  {
    challengeId: 11386479,
    title: "challenge",
    description: "ut officia elit ipsum cupidatat",
    totalWeeks: 16,
    minNumOfQuizzesByWeek: 85942490,
    cost: 93805265,
    university: "occaecat aliqua commodo tempor nisi",
    department: "veniam non deserunt",
    professorName: "laboris sunt esse",
    chapter: 41027926,
    target: "nulla dolore",
    startDate: "1973-03-24T10:08:45.890Z",
    endDate: "1953-09-18T23:19:36.805Z",
    applicationStartDate: "2015-01-14T05:25:00.059Z",
    applicationEndDate: "1973-07-16T19:06:03.108Z",
    detail: "aliquip occaecat",
    imageUrl:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    createdDate: "1963-01-13T10:55:32.988Z",
    modifiedDate: "2018-05-28T20:08:49.513Z",
    isParticipated: false,
  },
];

const currentWeek = {
  week: 4,
  now: "string",
};

const challengeDetail = {
  challengeId: 0,
  title: "운영체제",
  description: "string",
  totalWeeks: 15,
  minNumOfQuizzesByWeek: 0,
  cost: 0,
  university: "단국대",
  department: "소프트웨어학과",
  professorName: "김ㅇㅇ",
  chapter: 0,
  target: "string",
  startDate: "2022-08-23T04:59:55.645Z",
  endDate: "2022-08-23T04:59:55.645Z",
  applicationStartDate: "2022-08-23T04:59:55.645Z",
  applicationEndDate: "2022-08-23T04:59:55.645Z",
  detail: "string",
  imageUrl:
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80",
  createdDate: "2022-08-23T04:59:55.645Z",
  modifiedDate: "2022-08-23T04:59:55.645Z",
  isParticipated: true,
};

const challengesOpenWeeks = {
  totalWeeks: 15,
  weeks: [
    { week: 1, status: "success" },
    { week: 2, status: "fail" },
    { week: 3, status: "success" },
    { week: 4, status: "success" },
    { week: 5, status: "close" },
    { week: 6, status: "close" },
    { week: 7, status: "close" },
    { week: 8, status: "close" },
    { week: 9, status: "close" },
    { week: 10, status: "close" },
    { week: 11, status: "close" },
    { week: 12, status: "close" },
    { week: 13, status: "close" },
    { week: 14, status: "close" },
    { week: 15, status: "close" },
  ],
};

export const challengesHandlers = [
  // rest.get(formattingUrl("/challenges"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(challenges));
  // }),
  // rest.get(formattingUrl("/challenges/:cid"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(challengeDetail));
  // }),
  // rest.get(formattingUrl("/my/challenges"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(myChallenges));
  // }),
  // rest.get(formattingUrl("/challenges/:cid/now"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(currentWeek));
  // }),
  // rest.get(formattingUrl("/challenges/:cid/weeks"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(challengesOpenWeeks));
  // }),
];
