import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import * as NextRouter from "next/router";
import QuestionForm from "@/components/QuestionForm";
import { questionsAndAnswers } from "../../src/lib/QAndA";

const useRouterSpy = jest.spyOn(NextRouter, "useRouter");

describe("QuestionForm", () => {
  beforeEach(() => {
    useRouterSpy.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    useRouterSpy.mockReset();
  });

  test("1. renders without crashing", () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    expect(screen.getByText("QuestionForm")).toBeInTheDocument();
  });

  test("2. displays the correct question", () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    expect(
      screen.getByText(questionsAndAnswers[0].question)
    ).toBeInTheDocument();
  });

  test("3. displays the correct number of answer buttons with correct text", () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    questionsAndAnswers[0].answers.forEach((answer, index) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
  });

  test("4. goBack functionality", async () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    const backButton = screen.getByText("back");

    await act(async () => {
      fireEvent.click(backButton);
    });
    expect(
      screen.getByText(questionsAndAnswers[0].question)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText(questionsAndAnswers[0].answers[0]));
    });
    await act(async () => {
      fireEvent.click(backButton);
    });
    expect(
      screen.getByText(questionsAndAnswers[0].question)
    ).toBeInTheDocument();
  });

  test("5. renders the back button with correct text", () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    expect(screen.getByText("back")).toBeInTheDocument();
  });

  test("6. clicking on an answer button updates the current question", async () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    await act(async () => {
      fireEvent.click(screen.getByText(questionsAndAnswers[0].answers[0]));
    });
    expect(
      screen.getByText(questionsAndAnswers[1].question)
    ).toBeInTheDocument();
  });

  test("7. clicking on the back button when on the first question does not change the question", async () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    await act(async () => {
      fireEvent.click(screen.getByText("back"));
    });
    expect(
      screen.getByText(questionsAndAnswers[0].question)
    ).toBeInTheDocument();
  });

  test("8. clicking on the back button on later questions returns to the previous question", async () => {
    render(<QuestionForm questionsAndAnswers={ questionsAndAnswers } />);
    await act(async () => {
      fireEvent.click(screen.getByText(questionsAndAnswers[0].answers[0]));
    });
    await waitFor(() => { });
    await act(async () => {
      fireEvent.click(screen.getByText("back"));
    });
    expect(
      screen.getByText(questionsAndAnswers[0].question)
    ).toBeInTheDocument();
  });
});
