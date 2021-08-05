import './Sidebar.css';

interface IProps {
    value: string
}

export default function(props: IProps) {
    return (<div className="Sidebar">
        <p>{props.value}</p>
    </div>);
}