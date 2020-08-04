import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import BpkSelectableChip, {
    BpkDismissibleChip,
    CHIP_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-chip"

const chipTypes = Object.keys(CHIP_TYPES)

export function Chip(props) {
    const { _isSelectable, _isntSelected, text, onClick, ...rest } = props

    const [clicked, setClicked] = React.useState(_isSelectable && !_isntSelected)
    React.useEffect(() => setClicked(_isSelectable && !_isntSelected), [_isSelectable, _isntSelected])

    const handleClick = () => {
        setClicked(!clicked)
        onClick && onClick()
    }

    if (_isSelectable) {
        return (
            <BpkSelectableChip
                {...rest}
                accessibilityLabel="Toggle"
                selected={clicked}
                onClick={handleClick}
            >
                {text}
            </BpkSelectableChip>
        )
    } else {
        return (
            <div
                style={
                    clicked
                        ? { display: "none" }
                        : { display: "inline-block" }
                }
            >
                <BpkDismissibleChip
                    {...rest}
                    accessibilityLabel="Close"
                    onClick={handleClick}
                >
                    {text}
                </BpkDismissibleChip>
            </div>
        )
    }
}

Chip.defaultProps = {
    height: 36,
    text: "Chip",
    type: CHIP_TYPES.primary,
}

addPropertyControls(Chip, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: chipTypes,
        defaultValue: Chip.defaultProps.type,
    },
    _isSelectable: {
        type: ControlType.Boolean,
        title: "Action",
        defaultValue: true,
        enabledTitle: "Select",
        disabledTitle: "Dismiss",
    },
    _isntSelected: {
        type: ControlType.Boolean,
        title: "State",
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Selected",
        hidden: ({ _isSelectable }) => !_isSelectable,
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
