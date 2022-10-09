interface CommentProps {
  quizId: string;
}

interface CommentUpdateProps {
  requestData: {
    commentBody: {
      content: string;
    };
    quizId: string;
  };
}

interface CommentDeleteProps {
  commentId: number;
}

export type { CommentProps, CommentUpdateProps, CommentDeleteProps };
