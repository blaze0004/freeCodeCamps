import './DisplayPanel.css';

const DisplayPanel: React.FC<DisplayPanelProps> = (props) => <div className='display-panel'>
    <div className='display-panel-input'>{props.result}</div>
    <div className='display-panel-result'>{props.input}</div>
</div>

interface DisplayPanelProps {
    input?: string;
    result?: string;
}

DisplayPanel.defaultProps = {
    input: '12334-12312',
    result: '1231'
}

export default DisplayPanel;