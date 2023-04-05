import { question } from "../../types";

export const questionsAndAnswers: question[] = [
  {
    question: "how do you feel about being alone?",
    answers: ["I love it", "I hate it", "I'm okay with it", "I'm neutral"],
    score: [3, 0, 2, 1],
  },
  {
    question: "what do you enjoy doing in your spare time?",
    answers: ["reading", "hanging out with friends", "watching tv", "sleeping"],
    score: [2, 3, 1, 0],
  },
  {
    question: "how do you feel when in meetings?",
    answers: ["great", "not so great", "neutral", "i feel discomfort"],
    score: [3, 1, 2, 4],
  },
  {
    question: "how do you feel when you're in a crowd?",
    answers: ["i feel energized", "i feel drained", "i feel neutral"],
    score: [2, 0, 3],
  },
  {
    question: "how often do you leave your bedroom?",
    answers: ["i never leave", "i leave once a day", "i leave once a week"],
    score: [0, 2, 1],
  },
];
