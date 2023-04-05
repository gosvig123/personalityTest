import { NextApiRequest, NextApiResponse } from "next";
import {
  addResponse,
  getAllResponses,
  removeLastResponse,
} from "./reponsestore";
import { scoreCount } from "../../../types";
import { type } from "os";

interface Data {
  status: string | number;
}

type sum = number;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | sum>
) {
  try {
    if (req.method === "POST") {
      const { score, id } = req.body;

      addResponse(id, score);

      const allRes = getAllResponses();

      const myResponse: scoreCount[] = allRes.filter(
        (response) => response.id === id
      );

      const scores = myResponse[0].score;
      const sum = scores.reduce((a: number, b: number) => a + b);

      res.status(201).json(sum);
    } else if (req.method === "DELETE") {
      const { id } = req.body;

      removeLastResponse(id);

      res.status(200).json({ status: "your last score has been deleted" });
    } else {
      res.status(405).json({ status: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "An error occurred while processing your request" });
  }
}
