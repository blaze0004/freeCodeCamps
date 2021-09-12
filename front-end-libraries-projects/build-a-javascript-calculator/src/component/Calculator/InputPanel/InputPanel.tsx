import { useMemo } from "react";
import InputButton, { InputButtonProps } from "./InputButton/InputButton";
import "./InputPanel.css";

const InputPanel: React.FC<InputPanelProps> = (props) => {
  const buttons = useMemo(
    (): InputButtonProps[] => [
      {
        onClick: () => {},
        text: "AC",
        value: "AC",
        id: "clear",
      },
      {
        onClick: () => {},
        text: "/",
        value: "/",
        id: "divide",
      },
      {
        onClick: () => {},
        text: "x",
        value: "x",
        id: "multiply",
      },
      {
        onClick: () => {},
        text: "9",
        value: "9",
        id: "nine",
      },
      {
        onClick: () => {},
        text: "8",
        value: "8",
        id: "eight",
      },
      {
        onClick: () => {},
        text: "7",
        value: "7",
        id: "seven",
      },
      {
        onClick: () => {},
        text: "-",
        value: "-",
        id: "minus",
      },
      {
        onClick: () => {},
        text: "4",
        value: "4",
        id: "four",
      },
      {
        onClick: () => {},
        text: "5",
        value: "5",
        id: "five",
      },
      {
        onClick: () => {},
        text: "6",
        value: "6",
        id: "six",
      },
      {
        onClick: () => {},
        text: "+",
        value: "+",
        id: "plus",
      },
      {
        onClick: () => {},
        text: "1",
        value: "1",
        id: "one",
      },
      {
        onClick: () => {},
        text: "2",
        value: "2",
        id: "two",
      },
      {
        onClick: () => {},
        text: "3",
        value: "3",
        id: "three",
      },
      {
        onClick: () => {},
        text: "=",
        value: "=",
        id: "equal",
      },
      {
        onClick: () => {},
        text: "0",
        value: "0",
        id: "zero",
      },
      {
        onClick: () => {},
        text: ".",
        value: ".",
        id: "decimal",
      },
    ],
    []
  );
  return (
    <div className="input-panel">
      <div className="input-panel-buttons">
        {buttons.map((x) => (
          <InputButton {...x} />
        ))}
      </div>
    </div>
  );
};

interface InputPanelProps {}

export default InputPanel;
