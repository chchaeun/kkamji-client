export interface Comment {
  commentId: number;
  commentContent: string;
  commentCreatedDate: string;
  commentModifiedDate: string;
  isMine: boolean;
  isQuizWriter: boolean;
  writerName: string;
  quizId: number;
}
