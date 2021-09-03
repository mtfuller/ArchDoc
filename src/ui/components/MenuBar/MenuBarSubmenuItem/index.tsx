import './index.css';

interface IProps {
    name: string
    onClick: () => void
}

export default function MenuBarSubmenuItem({ name, onClick }: IProps) {
    return <div className="MenuBarSubmenuItem" onClick={onClick}>{name}</div>
}