import * as ReactDOM from 'react-dom';

import { useRef, useState } from 'react';

import ArchDocService from './adapters/ArchdocService';

import './styles.css';
import { generateGraphFromArchdoc } from './util/Archdoc';
import Layout from './components/Layout';
import MenuBar from './components/MenuBar';
import InfoPanel from './components/InfoPanel';
import Graph from './components/Graph';
import { Menu } from './components/MenuBar/Menu';

// @ts-ignore: Unreachable code error
const APP_VERSION: string = VERSION;

interface IInfoState {
    name: string
    value: string
}

const startVersionDialog = () => {alert(`ArchDoc v${APP_VERSION}`);};

const App = () => {
    const inputFile = useRef<any>(null);

    const [num, setNum] = useState(0);
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });
    const [infoState, setInfoState] = useState<IInfoState>({
        name: "Default View",
        value: ""
    });

    const handleSelect = (id, description) => {
        console.log(`Received: ${id}`);
        if (typeof description !== "string" || description.length === 0) {
            setInfoState({
                name: "",
                value: ""
            });
        } else {
            setInfoState({
                name: id,
                value: description
            });
        }
    }

    const handleFileSelect = async (event: any) => {
        const filePath = event.target.files[0].path;

        const obj = await ArchDocService.loadArchdocFile(filePath);

        if (obj !== null) {
            const newGraph = generateGraphFromArchdoc(obj);
            console.log(newGraph);
            setGraph(newGraph);
        }
    }

    const startVersionDialog = () => {alert(`ArchDoc v${APP_VERSION}`);};

    const menu: Menu = {
        submenus: [
            {
                name: "File",
                items: [
                    {name: "Open", action: () => {if (inputFile.current === null) return; inputFile.current.click()}}
                ]
            },
            {
                name: "Help",
                items: [
                    {name: "Version", action: startVersionDialog}
                ]
            }
        ]
    };

    return <div>
        <input type='file' ref={inputFile} style={{display: 'none'}} onChange={handleFileSelect}/>
        <Layout
            topPane={
                <MenuBar menu={menu} />
            }

            centerPane={
                <Graph graph={graph} onSelect={handleSelect} />
            }

            rightPane={
                <InfoPanel name={infoState.name} value={infoState.value} />
            } />
    </div>;
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);