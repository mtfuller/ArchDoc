import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import CloseIcon from '@material-ui/icons/Close';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MinimizeIcon from '@material-ui/icons/Minimize';
import './index.css';

//const CloseIcon = require('@material-ui/icons/Close')

interface IProps {
    type: WindowButtonType;
    onClick: Function
}

export enum WindowButtonType {
    MINIMIZE,
    MAXIMIZE,
    CLOSE
}

type SvgIconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

const getIconComponentFromType = (type: WindowButtonType): SvgIconComponent => {
    switch (type) {
        case WindowButtonType.MINIMIZE:
            return MinimizeIcon;
        case WindowButtonType.MAXIMIZE:
            return CheckBoxOutlineBlankIcon;
        case WindowButtonType.CLOSE:
            return CloseIcon;
    }
}

export default function MenuBarWindowButton(props: IProps) {
    const IconElement = getIconComponentFromType(props.type);

    return <div className="MenuBarWindowButton" onClick={(e) => props.onClick()}>
        <IconElement fontSize="small" classes={{fontSizeSmall: 'MuiSvgIcon-fontSizeSmall-override'}} />
    </div>
}