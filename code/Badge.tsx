import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
// @ts-ignore
import BpkBadge, { BADGE_TYPES } from "backpack-transpiled/bpk-component-badge"

interface Props {
    text?: string
    type?:
        | "warning"
        | "success"
        | "destructive"
        | "light"
        | "inverse"
        | "outline"
    centered?: boolean
    docked?: "left" | "right"
}

const defaultProps: Props = {
    text: "Badge",
    type: BADGE_TYPES.warning,
    centered: false,
    docked: null,
}

export function Badge(props: Props) {
    const { text, ...rest } = props

    return <BpkBadge {...rest}>{text}</BpkBadge>
}

Badge.defaultProps = defaultProps

addPropertyControls(Badge, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: [
            BADGE_TYPES.warning,
            BADGE_TYPES.success,
            BADGE_TYPES.destructive,
            BADGE_TYPES.light,
            BADGE_TYPES.inverse,
            BADGE_TYPES.outline,
        ],
    },
    centered: {
        type: ControlType.Boolean,
        title: "Centered",
    },
    docked: {
        type: ControlType.Enum,
        title: "Docked",
        options: [null, "left", "right"],
        optionTitles: ["None", "Left", "Right"],
    },
})
