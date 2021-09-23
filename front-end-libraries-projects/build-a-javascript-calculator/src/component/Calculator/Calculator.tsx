import { useState } from "react";
import { Utils } from "../../shared/Utils";
import "./Calculator.css";
import DisplayPanel from "./DisplayPanel/DisplayPanel";
import InputPanel from "./InputPanel/InputPanel";

const Calculator: React.FC = () => {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("0");

  const handleClick = (value: string) => {
    if (Utils.isCancel(value)) {
      setInput('0');
      setResult('');
    } else if (Utils.isNumber(value)) {
      setInput(prev => prev.length === 1 && prev === '0' ? value : prev + value);
    } else if (Utils.isDecimal(value) && !input.includes('.')) {
      setInput(prev => prev + value);
    } else if (Utils.isMathOperator(value)) {
        setInput((prevValue) => {
          const isPreviousAlsoMathOperator = Utils.isMathOperator(prevValue[prevValue.length - 1]);
          if (isPreviousAlsoMathOperator) {
            const newInput = prevValue.substring(0, prevValue.length - 1) + value;
            return newInput;
          } else {
            return prevValue + value;
          }
        });
    } else if (Utils.isEqualOperator(value)) {
      setResult(input + '=' + eval(input));
    }
  }

  return (
    <div className="calculator">
      <DisplayPanel input={input} result={result} />
      <InputPanel onClick={handleClick} />
    </div>
  );
};

export default Calculator;
