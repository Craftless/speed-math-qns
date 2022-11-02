import { useEffect, useState } from "react";
import { hasDuplicates, randomNumberRange, shuffle } from "../util/math";
import Option from "./Option";
import classes from "./QuizComponent.module.css";

function QuizComponent({
  qn, // The question to display
  ans, // The correct answer
  range, // Max range of wrong answers from correct answer
}: {
  qn: string;
  ans: number;
  range?: number;
}) {
  const [answers, setAnswers] = useState([] as number[]);

  useEffect(() => {
    
    let answers = generateOptions(ans, range ?? Math.abs(Math.floor(ans * 0.5)));
    let tries = 0;
    while (hasDuplicates(answers)) {
      answers = generateOptions(ans, range ?? Math.abs(Math.floor(ans * 0.5)));
      tries++;
      if (tries > 10) break; // To prevent infinite loops
    }
    setAnswers(shuffle(answers));
  }, []);

  function generateOptions(ans: number, range: number) {
    const wrong = Array(3)
      .fill(1)
      .map((val) => randomNumberRange(ans, range ?? ans * 0.5));
    return [ans, ...wrong];
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.questionContainer}>
        <p>5 + 5</p>
      </div>
      <div className={classes.optionsContainer}>
        {answers.map((val) => (
          <Option>{String(val)}</Option>
        ))}
      </div>
    </div>
  );
}

export default QuizComponent;
