import { CSSProperties } from "react";
import "./InputButton.css";

const InputButton: React.FC<InputButtonProps> = (props) => (
  <div style={props.style} id={props.id} className={['input-button'].join(' ')} onClick={() => props.onClick!(props.value!)}>
    {props.text}
  </div>
);

InputButton.defaultProps = {
    onClick: () => {},
    text: '0',
    id: 'one'
}

export interface InputButtonProps {
  text?: string;
  value?: string;
  id?: string;
  style?: CSSProperties | undefined,
  onClick?: (value: string) => void;
}

export default InputButton;
