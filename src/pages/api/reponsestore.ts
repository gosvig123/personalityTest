// responsesStore.ts
import { scoreCount } from "../../../types";
export const allResponses: scoreCount[] = [];

export function addResponse(id: string, score: number) {
  let found = false;
  for (let i = 0; i < allResponses.length; i++) {
    if (allResponses[i].id === id) {
      allResponses[i].score.push(score);
      found = true;
      break;
    }
  }

  if (!found) {
    allResponses.push({ id: id, score: [score] });
  }
  return;
}

export function removeLastResponse(id: string) {
  for (let i = 0; i < allResponses.length; i++) {
    if (allResponses[i].id === id) {
      allResponses[i].score.pop();
      break;
    }
  }
  return;
}

export function getAllResponses() {
  return allResponses;
}
