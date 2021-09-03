import marked from 'marked';
import './index.css';

interface IProps {
    name: string
    value: string
}

export default function InfoPanel(props: IProps) {
    return <div className="InfoPanel">
        <div className="info-group">
            <small>Component</small>
            <h1 className="title">{props.name}</h1>
        </div>
        <div className="info-group">
            <small>Description</small>
            <div dangerouslySetInnerHTML={{__html: marked(props.value)}}></div>
        </div>
    </div>;
}
