// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { scoreCount } from "../../../types";
import { allResponses } from "../../lib/allSurveys";
type Data = {
  id: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const id = allResponses.length;

      const question: scoreCount = {
        id: id.toString(),
        score: [],
      };

      allResponses.push(question);

      res.status(200).json({ id: id });
    }
  } catch (error) {
    console.log(error);
  }
}
