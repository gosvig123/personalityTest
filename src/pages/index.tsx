import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import { question } from "../../types";
import { getID } from "../lib/serverCalls";
import React from "react";

interface props {
  questionsAndAnswers: question[];
}

function Home({ questionsAndAnswers }: props) {
  const startSurvey = async function () {
    const returnId = await getID();

    if (returnId) {
      const { id } = returnId;
      localStorage.setItem("id", id);
    }

    setPersonalityTest(
      <QuestionForm questionsAndAnswers={questionsAndAnswers} />
    );
  };

  const [personalityTest, setPersonalityTest] = useState(
    <div className={styles.ctaStart}>
      <h2>
        why should you take this test?
        <br />
      </h2>
      <br />
      <p className={styles.description}>
        This test will help you understand your personality type and how it
        affects your life. It will also help you understand the personality
        types of the people around you.
      </p>
      <br />
      <p className={styles.description}>
        The MBTI is a personality test that helps you understand your
        personality type and how it affects your life. It also helps you
        understand the personality types of the people around you.
      </p>

      <button onClick={startSurvey} className={styles.startSurvey}>
        Take the Test
      </button>
    </div>
  );

  return (
    <>
      <Head>
        <title>Your True North</title>
        <meta name="description" content="discover who you really are" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Find Out if You are an Introvert or Extrovert
        </h1>
        <br />
        <p className={styles.description}>
          Take our quick personality test to discover your true nature!
        </p>
        <div className={styles.PrimaryWindow}>
          <Image
            className={styles.image}
            src="/hero.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
          />
          {personalityTest}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const questions = await fetch("http://localhost:3000/api/getsurvey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await questions.json();
    return {
      props: {
        questionsAndAnswers: data.questionsAndAnswers,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Home;
