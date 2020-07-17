import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
// @ts-ignore
import BpkButton from "backpack-transpiled/bpk-component-button"

interface Props {
    height?: number
    label?: string
    large?: boolean
    disabled?: boolean
    variant?: "primary" | "secondary" | "featured" | "destructive" | "outline" | "link"
    // link?: boolean
    // href?: string
    // blank?: boolean
    onClick?: any
}

const defaultProps: Props = {
    height: 36,
    label: "Button",
    large: false,
    disabled: false,
    variant: "primary",
    // link: false,
    // href: null,
    // blank: false,
}

export function Button(props: Props) {
    const { label, variant, ...rest } = props
    let bpkProps = { ...rest }
    if (variant !== "primary") {
        bpkProps[variant] = true
    }

    return <BpkButton {...bpkProps}>{label}</BpkButton>
}

Button.defaultProps = defaultProps

addPropertyControls(Button, {
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Done",
        placeholder: "None",
    },
    variant: {
        type: ControlType.Enum,
        title: "Type",
        options: ["primary", "secondary", "featured", "destructive", "outline", "link"],
    },
    large: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
    },
    // link: {
    //     type: ControlType.Boolean,
    //     title: "Link",
    // },
    // href: {
    //     type: ControlType.String,
    //     title: "Link href",
    // },
    // blank: {
    //     type: ControlType.Boolean,
    //     title: "Link Target",
    //     defaultValue: false,
    //     enabledTitle: "New Tab",
    //     disabledTitle: "Self",
    // },
    onClick: {
        type: ControlType.EventHandler,
    },
})
