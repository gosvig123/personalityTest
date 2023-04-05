export interface question {
  id?: number;
  question: string;
  answers: string[];
  score: number[];
}

export interface scoreCount {
  id: string;
  score: number[];
}

export interface id {
  id: string;
}
