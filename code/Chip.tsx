import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkChip, { CHIP_TYPES } from "backpack-transpiled/bpk-component-chip"

const chipTypes = Object.keys(CHIP_TYPES)

export function Chip(props) {
    const { text, onClose, ...rest } = props

    const [dismissed, setDismissed] = React.useState(false)

    const handleClose = () => {
        setDismissed(true)
        onClose && onClose()
    }

    return (
        <div style={dismissed ? { display: "none" } : {display: "inline-block"}}>
            <BpkChip {...rest} onClose={handleClose}>
                {text}
            </BpkChip>
        </div>
    )
}

Chip.defaultProps = {
    height: 36,
    text: "Chip",
    type: CHIP_TYPES.neutral,
    dismissible: true,
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
        defaultValue: CHIP_TYPES.neutral,
    },
    dismissible: {
        type: ControlType.Boolean,
        title: "Dismissible",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    onClose: {
        type: ControlType.EventHandler,
    },
})
