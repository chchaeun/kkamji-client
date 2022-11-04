interface Props {
  quizId: string;
}
const quizCommentsUrl = ({ quizId }: Props) => {
  return `/quizzes/${quizId}/comments`;
};

export { quizCommentsUrl };
