import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkChip, { CHIP_TYPES } from "backpack-transpiled/bpk-component-chip"

interface Props {
    height?: number
    text?: string
    type?: "neutral" | "primary"
    dismissible?: boolean
    onClose?: any
}

const defaultProps: Props = {
    height: 36,
    text: "Chip",
    type: CHIP_TYPES.neutral,
    dismissible: true,
}

export function Chip(props: Props) {
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

Chip.defaultProps = defaultProps

addPropertyControls(Chip, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: [CHIP_TYPES.neutral, CHIP_TYPES.primary],
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
