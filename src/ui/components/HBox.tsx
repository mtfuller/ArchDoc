import './HBox.css';

interface IProps {
    children: React.ReactNode
}

export default function HBox(props: IProps) {
    return <div className="HBox">
        {props.children}
    </div>
}