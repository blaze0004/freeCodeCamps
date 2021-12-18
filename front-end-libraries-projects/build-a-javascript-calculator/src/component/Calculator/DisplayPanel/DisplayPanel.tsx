import "./DisplayPanel.css";

const DisplayPanel: React.FC<DisplayPanelProps> = (props) => (
  <div id="display-wrapper" className="display-panel">
    <div className="display-panel-input"> {`${!!props.expression ? props.expression : '0'}${props.answer ? ' =' + props.answer : ''}`}</div>
    <div id='display' className="display-panel-input">{!!props.input ? props.input : '0'}</div>
  </div>
);

interface DisplayPanelProps {
  input: string;
  answer: string;
  expression: string;
}

export default DisplayPanel;
