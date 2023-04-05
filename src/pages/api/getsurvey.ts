import { NextApiRequest, NextApiResponse } from "next";
import { questionsAndAnswers } from "../../lib/QAndA";
import { question } from "../../../types";

type Data = {
  questionsAndAnswers: question[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      res.status(200).json({ questionsAndAnswers: questionsAndAnswers });
    }
  } catch (error) {
    console.log(error);
  }
}
