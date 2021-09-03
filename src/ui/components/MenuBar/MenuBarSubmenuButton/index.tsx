import { CSSProperties, useState } from "react"

import { SubmenuItem } from "../Menu";
import MenuBarSubmenuItem from "../MenuBarSubmenuItem";

import './index.css';

interface IProps {
    name: string
    submenuItems: SubmenuItem[]
    isMenuOpen: boolean

    onMenuToggle: (id: string) => void
    onMenuButtonSelect: (id: string) => void
}

export default function MenuBarSubmenuButton({name, submenuItems, isMenuOpen, onMenuToggle, onMenuButtonSelect}: IProps) {
    const menuStyle: CSSProperties = {
        display: (isMenuOpen) ? "block" : "none"
    }

    const handleOnClick = () => {
        onMenuToggle(name);
    }

    const handleMouseMove = () => {
        onMenuButtonSelect(name);
    }

    const buttonStyle: CSSProperties = {
        backgroundColor: (isMenuOpen) ? "#f0f0f0" : ""
    }

    return <div className="MenuBarSubmenuButton">
        <div className="button" style={buttonStyle} onClick={handleOnClick} onMouseMove={handleMouseMove}>{name}</div>
        <div className="menu" style={menuStyle}>
            {submenuItems.map((item, index) => (
                <MenuBarSubmenuItem key={index} name={item.name} onClick={() => {item.action(); handleOnClick();}} />
            ))}
        </div>
    </div>
}