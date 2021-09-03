import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import './index.css';

interface IProps {
    barWidth?: number;
    resizableSide: ResizablePaneSide
    children: React.ReactNode
}

export enum ResizablePaneSide {
    LEFT,
    RIGHT
}

export default function ResizablePane(props: IProps) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(100);

    const panel = useRef<HTMLInputElement>(null);

    const barWidth = (props.barWidth) ? props.barWidth : 10;

    

    useEffect(() => {
        if (panel.current !== null) {
            setHeight(panel.current.clientHeight);
        }
    })

    const handleMove = useCallback((event) => {
        let barX = 0, barY = 0;
        if (panel.current !== null) {
            const { left, top } = panel.current.getBoundingClientRect();

            barX = left;
            barY = top;
        }
        const { clientX: mouseX } = event;

        const barMidpoint = barWidth / 2;

        const newPanelWidth = (props.resizableSide === ResizablePaneSide.LEFT) 
            ? window.innerWidth - mouseX - barMidpoint 
            : mouseX - barMidpoint;

        setWidth(newPanelWidth);
    }, []);
    
    const handleMouseUp = useCallback((event) => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const barStyle: CSSProperties = {
        width: barWidth,
        cursor: "ew-resize",
        position: "absolute",
        height: `${height}px`
    }

    const contentStyle: CSSProperties = {
        width: width,
        overflow: "hidden",
        borderLeft: (props.resizableSide === ResizablePaneSide.LEFT) ? "1px solid #B8B8B8" : "0px",
        borderRight: (props.resizableSide === ResizablePaneSide.RIGHT) ? "1px solid #B8B8B8" : "0px",
    }

    const resizableBar = <div className="bar"
        style={barStyle}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}></div>

    const paneContents = <div ref={panel} className="contents" style={contentStyle}>
            {props.children}
        </div>

    if (props.resizableSide === ResizablePaneSide.LEFT) {
        return <div className="ResizablePane">
            {resizableBar}
            {paneContents}
        </div>;
    } else {
        return <div className="ResizablePane">
            {paneContents}
            {resizableBar}
        </div>;
    }
}