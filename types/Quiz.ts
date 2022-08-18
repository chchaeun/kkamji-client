export interface QuizDetail {
  quizId: number;
  quizTitle: string;
  quizContent: string;
  quizCategory: string;
  quizNumber: number;
  isQuizSolved: boolean;
  isMine: boolean;
  files: {
    fileName: string;
    filePath: string;
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
  quizCategory: string;
  isQuizSolved: boolean;
  quizNumber: number;
}

export interface QuizEdit {
  quizAnswer: string;
  quizExplanation: string;
  quizSource: string;
}
