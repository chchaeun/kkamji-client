export interface QuizDetail {
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizCategory: string;
  quizContent: string;
  quizAnswer: string | null;
  quizExplanation: string | null;
  quizRubric: string;
  quizCreatedDate: string;
  quizModifiedDate: string;
  isMine: boolean;
  solveAnswer: string | null;
  solveScore: number | null;
  writerName: string;
  challengeId: number;
  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
  }[];
}
export interface QuizDetailSelect {
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizCategory: string;
  quizContent: string;
  quizAnswer: string | null;
  quizExplanation: string | null;
  quizRubric: {
    score: number;
    content: string;
  }[];
  quizCreatedDate: string;
  quizModifiedDate: string;
  isMine: boolean;
  solveAnswer: string | null;
  solveScore: number | null;
  writerName: string;
  challengeId: number;

  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
  }[];
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
  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
  }[];
}
export interface MyQuizDetailSelect {
  quizId: number;
  quizTitle: string;
  quizWeek: number;
  quizCategory: string;
  quizContent: string;
  quizAnswer: string;
  quizExplanation: string;
  quizRubric: {
    score: number;
    content: string;
  }[];
  quizCreatedDate: string;
  quizModifiedDate: string;
  writerName: string;
  challengeId: number;
  quizFiles: {
    id: number;
    qfName: string;
    qfType: string;
    qfPath: string;
    qfCreatedDate: string;
    qfModifiedDate: string;
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
  solveAnswer: string | null;
  solveScore: number | null;
  writerName: string;
  challengeId: number;
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
