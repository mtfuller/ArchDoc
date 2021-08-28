import './Sidebar.css';
import marked from 'marked';

interface IProps {
    value: string
}

export default function(props: IProps) {
    return <div className="Sidebar" dangerouslySetInnerHTML={{__html: marked(props.value)}}></div>;
}