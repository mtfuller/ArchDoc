import ResizablePane, { ResizablePaneSide } from "./ResizablePane";
import './index.css';

interface IProps {
    topPane?: React.ReactNode,
    leftPane?: React.ReactNode,
    centerPane: React.ReactNode,
    rightPane?: React.ReactNode,
    bottomPane?: React.ReactNode
}


export default function Layout(props: IProps) {
    const topPane = (props.topPane) ? <div style={{zIndex: 1}}>{props.topPane}</div> : null;
    const leftPane = (props.leftPane) ? <ResizablePane barWidth={5} resizableSide={ResizablePaneSide.RIGHT}>{props.leftPane}</ResizablePane> : null;
    const centerPane = (props.centerPane) ? <div className="center-pane">{props.centerPane}</div> : null;
    const rightPane = (props.rightPane) ? <ResizablePane barWidth={5} resizableSide={ResizablePaneSide.LEFT}>{props.rightPane}</ResizablePane> : null;
    const bottomPane = (props.bottomPane) ? <div>{props.bottomPane}</div> : null;

    return <div className="Layout">
        {topPane}
        <div className="middle-row">
            {leftPane}
            {centerPane}
            {rightPane}
        </div>
        {bottomPane}
    </div>
}
