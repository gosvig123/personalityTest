import React, { useState } from "react";
import { question } from "../../types";

import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { postAnswer, deleteAnswer } from "../lib/serverCalls";
interface props {
  questionsAndAnswers: question[];
}

function QuestionForm({ questionsAndAnswers }: props) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const router = useRouter();
  const handleResponse = async (indexOfScore: number) => {
    const score: number =
      questionsAndAnswers[currentQuestion].score[indexOfScore];
    const myCurrentScore = await postAnswer(score);

    if (currentQuestion >= questionsAndAnswers.length - 1) {
      router.push(`/thankyou?score=${myCurrentScore}`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const goBack = async function () {
    if (currentQuestion === 0) {
      return;
    }

    setCurrentQuestion(currentQuestion - 1);
    await deleteAnswer();
    return;
  };

  return (
    <div className={styles.mainDiv}>
      <h3>QuestionForm</h3>
      <br />
      <p className={styles.description}>
        {questionsAndAnswers[currentQuestion].question}
      </p>
      <br />
      <div className={styles.answerDiv}>
        {questionsAndAnswers[currentQuestion].answers.map(
          (answer, index: number) => (
            <button
              style={{
                width: "100%",
              }}
              key={index}
              className={styles.answerButton}
              onClick={() => handleResponse(index)}
            >
              {answer}
            </button>
          )
        )}
      </div>

      <button className={styles.backButton} onClick={goBack}>
        back
      </button>
    </div>
  );
}

export default QuestionForm;
