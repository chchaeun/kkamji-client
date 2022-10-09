interface QuizAnswerProps {
  quizId: string;
  answer: string;
}

interface QuizGradeProps {
  quizId: string;
  score: number;
}

interface QuizzesProps {
  challengeId: string;
  week?: string;
}

interface QuizSubmitProps {
  challengeId: string;
  quizSubmitBody: FormData;
}

interface QuizProps {
  quizId: string;
}

interface QuizSubmitCountProps {
  challengeId: string;
  week: number;
}

interface QuizRateProps {
  quizId: string;
  rate: "GOOD" | "BAD" | null;
}

export type {
  QuizAnswerProps,
  QuizGradeProps,
  QuizzesProps,
  QuizSubmitProps,
  QuizProps,
  QuizSubmitCountProps,
  QuizRateProps,
};
