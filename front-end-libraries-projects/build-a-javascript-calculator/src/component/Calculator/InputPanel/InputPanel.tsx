import { useMemo } from "react";
import InputButton, { InputButtonProps } from "./InputButton/InputButton";
import "./InputPanel.css";

const InputPanel: React.FC<InputPanelProps> = (props) => {
  const buttons = useMemo(
    (): InputButtonProps[] => [
      {
        onClick: props.onClick,
        text: "AC",
        value: "AC",
        id: "clear",
      },
      {
        onClick: props.onClick,
        text: "/",
        value: "/",
        id: "divide",
      },
      {
        onClick: props.onClick,
        text: "*",
        value: "*",
        id: "multiply",
      },
      {
        onClick: props.onClick,
        text: "9",
        value: "9",
        id: "nine",
      },
      {
        onClick: props.onClick,
        text: "8",
        value: "8",
        id: "eight",
      },
      {
        onClick: props.onClick,
        text: "7",
        value: "7",
        id: "seven",
      },
      {
        onClick: props.onClick,
        text: "-",
        value: "-",
        id: "minus",
      },
      {
        onClick: props.onClick,
        text: "4",
        value: "4",
        id: "four",
      },
      {
        onClick: props.onClick,
        text: "5",
        value: "5",
        id: "five",
      },
      {
        onClick: props.onClick,
        text: "6",
        value: "6",
        id: "six",
      },
      {
        onClick: props.onClick,
        text: "+",
        value: "+",
        id: "plus",
      },
      {
        onClick: props.onClick,
        text: "1",
        value: "1",
        id: "one",
      },
      {
        onClick: props.onClick,
        text: "2",
        value: "2",
        id: "two",
      },
      {
        onClick: props.onClick,
        text: "3",
        value: "3",
        id: "three",
      },
      {
        onClick: props.onClick,
        text: "=",
        value: "=",
        id: "equal",
      },
      {
        onClick: props.onClick,
        text: "0",
        value: "0",
        id: "zero",
      },
      {
        onClick: props.onClick,
        text: ".",
        value: ".",
        id: "decimal",
      },
    ],
    [props.onClick]
  );
  return (
    <div className="input-panel">
      <div className="input-panel-buttons">
        {buttons.map((x) => (
          <InputButton key={x.id} {...x} />
        ))}
      </div>
    </div>
  );
};

interface InputPanelProps {
  onClick: (value: string) => void;
}

export default InputPanel;
