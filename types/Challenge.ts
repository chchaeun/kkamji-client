export interface Challenge {
  challengeId: number;
  title: string;
  description: string;
  totalWeeks: number;
  minNumOfQuizzesByWeek: number;
  cost: number;
  university: string;
  department: string;
  professorName: string;
  chapter: number;
  target: string;
  startDate: string;
  endDate: string;
  applicationStartDate: string;
  applicationEndDate: string;
  detail: string;
  imageUrl: string;
  createdDate: string;
  modifiedDate: string;
  isParticipated: boolean;
}

export interface CurrentWeek {
  week: number;
  now: string;
}

export interface OpenWeeks {
  challengeId: number;
  totalWeeks: number;
  weeks: boolean[];
}
