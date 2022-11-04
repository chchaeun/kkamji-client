interface Props {
  quizId: string;
}
const quizSolveUrl = ({ quizId }: Props) => {
  return `/quizzes/${quizId}/solve`;
};
export { quizSolveUrl };
