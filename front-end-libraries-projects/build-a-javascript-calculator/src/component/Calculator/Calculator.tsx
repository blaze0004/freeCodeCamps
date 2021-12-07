import { useState } from "react";
import { Utils } from "../../shared/Utils";
import "./Calculator.css";
import DisplayPanel from "./DisplayPanel/DisplayPanel";
import InputPanel from "./InputPanel/InputPanel";

const Calculator: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState("");

  const handleCancel = () => {
    setAnswer("");
    setExpression("");
    setInput("");
  };

  const handleNumber = (value: string) => {
    if (answer) {
      setInput(value);
      setExpression(value);
      setAnswer("");
    } else {
      setInput((prev) =>
        prev.includes(".") ||
        (prev.length >= 1 && Utils.isNumber(prev[prev.length - 1]) && prev[prev.length - 1] !== '0')
          ? prev + value
          : value
      );
      setExpression((prev) => prev + value);
    }
  };

  const handleDecimal = () => {
    const hasNoOperatorOrDecimal =
      !Utils.MATH_OPERATORS.some((x) => expression.includes(x)) &&
      !expression.includes(".");

    if (hasNoOperatorOrDecimal) {
      setExpression((prev) => prev + ".");
      setInput((prev) =>
        Utils.isNumber(prev[prev.length - 1]) ? prev + "." : "."
      );
      return;
    }

    const lastIndexOfOperator = Math.max(
      ...Utils.MATH_OPERATORS.map((x) => expression.lastIndexOf(x))
    );
    const lastIndexOfDecimal = expression.lastIndexOf(".");
    if (lastIndexOfDecimal < lastIndexOfOperator) {
      setExpression((prev) => prev + ".");
      setInput((prev) =>
        Utils.isNumber(prev[prev.length - 1]) ? prev + "." : "."
      );
    }
  };

  const handleMathOperator = (value: string) => {
    if (answer) {
      setExpression(answer + value);
      setInput(value);
      setAnswer("");
      return;
    }
    if (value === "-") {
      if (expression.length) {
        if (
          expression.length >= 2 &&
          Utils.isMathOperator(expression[expression.length - 1]) &&
          Utils.isMathOperator(expression[expression.length - 2])
        ) {
          setExpression((prev) => prev.substring(0, prev.length - 1) + value);
        } else {
          setExpression((prev) => prev + value);
        }
      } else {
        setExpression((prev) => prev + value);
      }
    } else {
      if (
        expression.length >= 2 &&
        Utils.isMathOperator(expression[expression.length - 2]) &&
        expression[expression.length - 1] === "-"
      ) {
        setExpression((prev) => prev.substring(0, prev.length - 2) + value);
      } else if (Utils.isMathOperator(expression[expression.length - 1])) {
        setExpression((prev) => prev.substring(0, prev.length - 1) + value);
      } else {
        setExpression((prev) => prev + value);
      }
    }

    setInput(value);
  };

  const handleEqual = () => {
    let result = "";
    if (
      expression.length &&
      Utils.isMathOperator(expression[expression.length - 1])
    ) {
      setExpression((prev) => prev.substring(0, prev.length - 1));
      result = expression.substring(0, expression.length - 1);
    } else {
      result = Utils.calculate(expression);
    }

    setAnswer(result);
    setInput(result);
  };

  const handleClick = (value: string) => {
    if (Utils.isCancel(value)) {
      handleCancel();
    } else if (Utils.isNumber(value)) {
      handleNumber(value);
    } else if (Utils.isDecimal(value)) {
      handleDecimal();
    } else if (Utils.isMathOperator(value)) {
      handleMathOperator(value);
    } else if (Utils.isEqualOperator(value)) {
      handleEqual();
    }
  };

  return (
    <div className="calculator">
      <DisplayPanel input={input} answer={answer} expression={expression} />
      <InputPanel onClick={handleClick} />
    </div>
  );
};

export default Calculator;
