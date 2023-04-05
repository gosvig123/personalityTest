import { id } from "../../types";
export async function postAnswer(score: number): Promise<string | void> {
  try {
    const id = localStorage.getItem("id");
    const res = await fetch("http://localhost:3000/api/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score,
        id,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getID = async function (): Promise<id | void> {
  try {
    const res = await fetch("http://localhost:3000/api/startsurvey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export async function deleteAnswer(): Promise<void> {
  try {
    const id = localStorage.getItem("id");

    const res = await fetch("http://localhost:3000/api/survey", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
