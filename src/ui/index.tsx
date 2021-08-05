import * as ReactDOM from 'react-dom';

import { useRef, useState } from 'react';

import CounterService from './adapters/CounterService';
import LegacyGraph from './components/LegacyGraph';

import './styles.css';
import Sidebar from './components/Sidebar';
import HBox from './components/HBox';
import Box from './components/Box';

const MyForm = (props) => {
    const inputFile = useRef(null) 
    
    const [state, setState] = useState({
        filepath: ""
    });

    const handleFileSelect = (event) => {
        const filePath = event.target.files[0].path;
        props.onFileSelect(filePath);
    }

    return <div>
        <input type='file' ref={inputFile} style={{display: 'none'}} onChange={handleFileSelect}/>
        <button onClick={e => inputFile.current.click()}></button>
    </div>;
}

const App = () => {
    const [num, setNum] = useState(0);
    const [text, setText] = useState("Default");

    const handleIncrement = () => {
        const newNum = CounterService.increment(1);
        setNum(newNum);
    }

    const handleDecrement = () => {
        const newNum = CounterService.decrement(1);
        setNum(newNum);
    }

    const handleSelect = (id) => {
        console.log(`Received: ${id}`);
        setText(id);
    }

    const handleFileSelect = (filePath: string) => {
        console.log(filePath);
    }

    return <HBox>
        <Box width={100} isResizable={false}>
            <MyForm onFileSelect={handleFileSelect} />
        </Box>
        <Box width={100} isResizable={false}>
            <LegacyGraph onSelect={handleSelect} />
        </Box>
        <Box width={100} isResizable={true}>
            <Sidebar value={text}/>
        </Box>
        
    </HBox>;
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);