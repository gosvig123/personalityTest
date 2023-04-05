import React from "react";
import styles from "../styles/ThankYou.module.css";
import { useRouter } from "next/router";
import { Context } from "vm";
interface ThankYouProps {
  score: string;
}

function ThankYou({ score }: ThankYouProps) {
  const router = useRouter();
  let numberedScore = parseInt(score);
  let personalityType = "";

  if (numberedScore <= 1) {
    personalityType = "very introvert";
  }
  if (numberedScore >= 2 && numberedScore <= 3) {
    personalityType = "introvert";
  }
  if (numberedScore >= 4 && numberedScore <= 5) {
    personalityType = "extrovert";
  }
  if (numberedScore > 5) {
    personalityType = "very extrovert";
  }

  return (
    <>
      {score ? (
        <div className={styles.thankyou}>
          <h1 className={styles.title}>Thank you for taking the quiz!</h1>
          <h2 className={styles.personalityType}>You are {personalityType}</h2>
          <p className={styles.thankYouMessage}>
            We appreciate your time and effort in completing this quiz. We hope
            you found it insightful and enjoyable. Feel free to share your
            results with friends and family or take the quiz again if you'd like
            to explore other aspects of your personality.
          </p>

          <button className={styles.retake} onClick={() => router.push("/")}>
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className={styles.thankyou}>
          <h1 className={styles.title}>
            please take the test before going to the thank you page!
          </h1>
          <button className={styles.retake} onClick={() => router.push("/")}>
            Take Quiz
          </button>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context: Context) {
  const params = context.query.score;

  return {
    props: {
      score: params,
    },
  };
}

export default ThankYou;
