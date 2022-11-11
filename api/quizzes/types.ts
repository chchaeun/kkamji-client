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

interface QuizRateProps {
  quizId: string;
  rate: "GOOD" | "BAD" | null;
}

export type { QuizzesProps, QuizSubmitProps, QuizProps, QuizRateProps };
