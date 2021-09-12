import './Calculator.css';
import DisplayPanel from './DisplayPanel/DisplayPanel';
import InputPanel from './InputPanel/InputPanel';

const Calculator: React.FC = () => {
    return <div className='calculator'>
        <DisplayPanel />
        <InputPanel />
    </div>
}

export default Calculator;