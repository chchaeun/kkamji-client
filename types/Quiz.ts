export interface QuizDetail {
  challengeId: number;
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizContent: string;
  quizCreatedDate: string;
  quizModifiedDate: string;
  writerName: string;
  cntOfGood: number;
  cntOfSolved: number;
  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
  }[];
  quizInfoByUser: {
    userId: number;
    isMine: boolean;
    didIRate: "GOOD" | "BAD" | null;
    solveAnswer: string;
  };
}
export interface MyQuizDetail {
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizCategory: string;
  quizContent: string;
  quizAnswer: string;
  quizExplanation: string;
  quizRubric: string;
  quizCreatedDate: string;
  quizModifiedDate: string;
  writerName: string;
  challengeId: number;
  didIRate: "GOOD" | "BAD" | null;
  cntOfGood: number;
  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
  }[];
}
export interface MyQuizDetailSelect extends Omit<MyQuizDetail, "quizRubric"> {
  quizRubric: {
    score: number;
    content: string;
  }[];
}
export interface QuizAnswer {
  quizId: number;
  quizAnswer: string;
  quizExplanation: string;
  quizSource: string;
}

export interface QuizIsSolved {
  userId: number;
  userName: string;
  quizId: number;
  quizIsSolved: boolean;
}

export interface QuizSummary {
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizCategory: string;
  quizCreatedDate: string;
  quizModifiedDate: string;
  isMine: boolean;
  isSolved: boolean;
  cntOfSolved: number;
  writerName: string;
  challengeId: number;
  cntOfGood: number;
}

export interface QuizEdit {
  quizAnswer: string;
  quizExplanation: string;
  quizRubric: string;
}

export interface QuizSubmitCount {
  count: number;
  challengeId: number;
  week: number;
}

export interface QuizSolve {
  quiz: {
    quizId: number;
    answer: string;
    explanation: string;
    rubric: string;
  };
  solve: {
    answer: string;
    score: number;
    rubric: string;
  };
}

export interface QuizSolveSelect {
  quiz: {
    quizId: number;
    answer: string;
    explanation: string;
    rubric: {
      score: number;
      content: string;
    }[];
  };
  solve: {
    answer: string;
    score: number | null;
    rubric: string | null;
  };
}
