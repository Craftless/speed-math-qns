import { useEffect, useState } from "react";
import { hasDuplicates, randomNumberRange, shuffle } from "../util/math";
import Option from "./Option";
import classes from "./QuizComponent.module.css";

function QuizComponent({
  qn, // The question to display
  ans, // The correct answer
  onOver,
  range, // Max range of wrong answers from correct answer
  stats,
}: {
  qn: string;
  ans: number;
  onOver: (type: "correct" | "wrong" | "skipped") => void;
  range?: number;
  stats: {
    numCorrect: number;
    numWrong: number;
    numSkipped: number;
    score: number;
  };
}) {
  const [answers, setAnswers] = useState([] as number[]);
  const colours = ["#15961A", "#EE6D6D", "#1EAEFF", "#6D7600"];

  useEffect(() => {
    let answers = generateOptions(
      ans,
      range ?? Math.max(5, Math.abs(Math.floor(ans * 0.5)))
    );
    let tries = 0;
    while (hasDuplicates(answers)) {
      answers = generateOptions(
        ans,
        range ?? Math.max(5, Math.abs(Math.floor(ans * 0.5)))
      );
      tries++;
      if (tries > 10) break; // To prevent infinite loops
    }
    setAnswers(shuffle(answers));
  }, [qn, ans, range]);

  function generateOptions(ans: number, range: number) {
    const wrong = Array(3)
      .fill(1)
      .map((val) => randomNumberRange(ans, range ?? ans * 0.5));
    return [ans, ...wrong];
  }

  function checkAnswer(givenAns: number) {
    return givenAns === ans;
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.statusContainer}>
        <p>Score: {stats.score} </p>
        <p>Correct: {stats.numCorrect} </p>
        <p>Wrong: {stats.numWrong} </p>
        <p>Skipped: {stats.numSkipped} </p>
      </div>
      <div className={classes.questionContainer}>
        <div className={classes.questionInnerContainer}>
          <p>What is {qn}?</p>
        </div>
      </div>
      <div className={classes.optionsContainer}>
        <div className={classes.gridContainer}>
          {answers.map((val, index) => (
            <Option
              onPress={() => {
                onOver(checkAnswer(val) ? "correct" : "wrong");
              }}
              color={colours[index]}
              key={index}
            >
              <p>{String(val)}</p>
            </Option>
          ))}
        </div>
      </div>
      <div className={classes.skipBtnContainer}>
        <button
          onClick={() => {
            onOver("skipped");
          }}
          className={classes.skipBtn}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default QuizComponent;
