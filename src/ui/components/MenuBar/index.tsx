import { useCallback, useState } from 'react';

import WindowService from '../../adapters/WindowService';
import { Menu } from './Menu';
import MenuBarSubmenuButton from './MenuBarSubmenuButton';
import MenuBarWindowButton, { WindowButtonType } from './MenuBarWindowButton';

import './index.css';

const logo = require('../../assets/archdoc_menu_logo.png').default;

interface IProps {
    menu: Menu
}

export default function MenuBar({ menu }: IProps) {

    const [openMenuButton, setOpenMenuButton] = useState<string|null>(null);

    const isMenuOpen = openMenuButton !== null;

    const handleMenuToggle = (id: string) => {
        if (isMenuOpen) {
            setOpenMenuButton(null);
        } else {
            setOpenMenuButton(id);
        }
    }

    const handleMenuButtonSelect = (id: string) => {
        if (isMenuOpen) {
            setOpenMenuButton(id);
        }
    }

    const handleMinimize = () => {
        const isMinimized = WindowService.minimize();

        if (!isMinimized) {
            alert(`Not minimized!`);
        }
    }

    const handleMaximize = () => {
        const isMaximized = WindowService.maximize();

        if (!isMaximized) {
            alert(`Not maximized!`);
        }
    }

    const handleClose = () => {
        const isClosed = WindowService.close();

        if (!isClosed) {
            alert(`Not closed!`);
        }
    }

    const menuBarButtons = menu.submenus.map((submenu, index) => (
            <MenuBarSubmenuButton key={index}
                name={submenu.name}
                submenuItems={submenu.items}
                isMenuOpen={(openMenuButton === submenu.name)}
                onMenuToggle={handleMenuToggle}
                onMenuButtonSelect={handleMenuButtonSelect} />
        ));

    return <div className="MenuBar">
        <div className="left-group">
            <div className="logo"><img src={String(logo)} /></div>
            {menuBarButtons}
        </div>
        <div className="middle-group">
        </div>
        <div className="right-group">
            <MenuBarWindowButton type={WindowButtonType.MINIMIZE} onClick={handleMinimize} />
            <MenuBarWindowButton type={WindowButtonType.MAXIMIZE} onClick={handleMaximize} />
            <MenuBarWindowButton type={WindowButtonType.CLOSE} onClick={handleClose} />
        </div>
    </div>
}
