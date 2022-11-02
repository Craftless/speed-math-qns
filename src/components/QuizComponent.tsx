import { useEffect, useState } from "react";
import { randomNumberAbove, randomNumberBelow, shuffle } from "../util/math";
import Option from "./Option";
import classes from "./QuizComponent.module.css";

function QuizComponent({
  qn,
  ans,
  below,
  query,
}: {
  qn: string;
  ans: number;
  below?: boolean;
  query: number;
}) {
  const [answers, setAnswers] = useState([] as number[]);

  useEffect(() => {
    let answers;
    if (below) {
      const wrong = Array(3)
        .fill(1)
        .map((val) => randomNumberBelow(query));
      answers = [ans, ...wrong];
    } else {
      const wrong = Array(3)
        .fill(1)
        .map((val) => randomNumberAbove(query, query * 3));
      answers = [ans, ...wrong];
    }

    setAnswers(shuffle(answers));
  }, []);

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
