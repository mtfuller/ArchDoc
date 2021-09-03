export interface SubmenuItem {
    name: string,
    action: () => void
}

export interface Submenu {
    name: string,
    items: SubmenuItem[]
}

export interface Menu {
    submenus: Submenu[]
}