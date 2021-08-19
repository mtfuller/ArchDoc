import * as ReactDOM from 'react-dom';

import { useRef, useState } from 'react';

import CounterService from './adapters/CounterService';
import ArchDocService from './adapters/ArchdocService';

import LegacyGraph from './components/LegacyGraph';

import './styles.css';
import Sidebar from './components/Sidebar';
import HBox from './components/HBox';
import Box from './components/Box';
import { generateGraphFromArchdoc } from './util/Archdoc';

const MyForm = (props) => {
    const inputFile = useRef<any>(null) 
    
    const [state, setState] = useState({
        filepath: ""
    });

    const handleFileSelect = (event) => {
        const filePath = event.target.files[0].path;
        props.onFileSelect(filePath);
    }

    return <div>
        <input type='file' ref={inputFile} style={{display: 'none'}} onChange={handleFileSelect}/>
        <button onClick={e => {if (inputFile.current === null) return; inputFile.current.click()}}>OPEN</button>
    </div>;
}

const App = () => {
    const [num, setNum] = useState(0);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });
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

    const handleFileSelect = async (filePath: string) => {
        const obj = await ArchDocService.loadArchdocFile(filePath);

        if (obj !== null) {
            const newGraph = generateGraphFromArchdoc(obj);
            console.log(newGraph);
            setGraph(newGraph);
        }
    }

    return <HBox>
        <Box width={100} isResizable={false}>
            <MyForm onFileSelect={handleFileSelect} />
        </Box>
        <Box width={100} isResizable={false}>
            <LegacyGraph graph={graph} onSelect={handleSelect} />
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