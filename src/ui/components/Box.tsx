import { useCallback, useState } from 'react';
import './Box.css';

interface IProps {
    width: number,
    isResizable: boolean
    children: React.ReactNode
}

export default function Box (props: IProps) {
    const [width, setWidth] = useState(props.width);
    const [isDragging, setIsDragging] = useState(false);

    let classes = "Box";
    if (props.isResizable) {
        classes += " resizable"
    }

    const handleMove = useCallback((event) => {
        console.log(`Box::handleMouseMove`);
        console.log(console.log(event));
        console.log(`ClientX: ${event.clientX}`);
        console.log(`Browser Width: ${window.innerWidth}`);

        //const widthOfBar = 10;
        const barMidpoint = width + 5;
        const r = window.innerWidth - event.clientX;
        const delta = barMidpoint - r;

        const myNewWidth = width - delta;
        setWidth(myNewWidth);
    }, []);
    
    const handleMouseUp = (event) => {
        console.log(`Box::handleMouseUp`);
        console.log(console.log(event));
        window.removeEventListener("mousemove", handleMove);
    }

    const handleMouseDown = (event) => {
        console.log(`Box::handleMouseDown`);
        console.log(console.log(event));
        window.addEventListener("mousemove", handleMove);
    }

    let divStyle = {};
    if (props.isResizable) divStyle ={
        width: width,
        overflow: "hidden",
    }

    return <div className={classes}>
        {props.isResizable && <div className="bar" onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>

        </div>}
        
        <div style={divStyle}>
            {props.children}
        </div>
        
    </div>
}