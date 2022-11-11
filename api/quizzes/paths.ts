interface QuizProps {
  quizId: string;
}

interface QuizListProps {
  challengeId: string;
  page: "READABLE" | "MY" | "LIKED";
}
interface SubmitCountProps {
  challengeId: string;
}
const quizDetailUrl = ({ quizId }: QuizProps) => {
  return `/quizzes/${quizId}/content`;
};

const myQuizDetailUrl = ({ quizId }: QuizProps) => {
  return `/my/quizzes/${quizId}`;
};

const quizListUrl = ({ challengeId, page }: QuizListProps) => {
  switch (page) {
    case "READABLE":
      return `/challenges/${challengeId}/quizzes`;
    case "MY":
      return `/challenges/${challengeId}/my/quizzes`;
    case "LIKED":
      return `/challenges/${challengeId}/my-good-quizzes`;
  }
};

const submitCountUrl = ({ challengeId }: SubmitCountProps) => {
  return `/challenges/${challengeId}/my/quizzes/count`;
};

const submitStackedCountUrl = "/my/quizzes/count";

export {
  quizDetailUrl,
  myQuizDetailUrl,
  quizListUrl,
  submitCountUrl,
  submitStackedCountUrl,
};
