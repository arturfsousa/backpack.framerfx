import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

export function Icon(props) {
    const { variant, isLarge, tint, onClick, ...rest } = props

    const Icon = isLarge ? Icons.lg[variant] : Icons.sm[variant]

    return <Icon fill={tint} onClick={onClick}/>
}

Icon.defaultProps = {
    height: 18,
    width: 18,
    variant: "flight",
    isLarge: false,
    tint: "#0099ff",
}

addPropertyControls(Icon, {
    variant: {
        type: ControlType.Enum,
        title: "Icon",
        options: Object.keys(Icons.lg),
        optionTitles: Object.keys(Icons.lg).map((key) => Icons.lg[key]),
    },
    isLarge: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    tint: {
        title: "Tint",
        type: ControlType.Color,
        defaultValue: "#0099ff",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
