interface QuizProps {
  quizId: string;
}

interface QuizAnswerProps extends QuizProps {
  answer: string;
}

interface QuizGradeProps extends QuizProps {
  scoreBody: {
    score: number;
    solveRubric: string;
  };
}

export type { QuizProps, QuizAnswerProps, QuizGradeProps };
