export interface IFetchChapter {
  chapterId: string;
}

export interface IFetchQuizbook extends IFetchChapter {
  quizbookId: string;
}
export interface IFetchQuiz extends IFetchQuizbook {
  quizId: string;
}
