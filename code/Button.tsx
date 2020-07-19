import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { findIcon } from "./Icon"

// @ts-ignore
import BpkButton from "backpack-transpiled/bpk-component-button"
import {
    withButtonAlignment,
    withRtlSupport,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-icon"
// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

// interface Props {
//     height?: number
//     label?: string
//     large?: boolean
//     disabled?: boolean
//     variant?: "primary" | "secondary" | "featured" | "destructive" | "outline" | "link"
//     // link?: boolean
//     // href?: string
//     // blank?: boolean
//     hasTrailingIcon?: boolean
//     onClick?: any
// }

const defaultProps = {
    height: 36,
    label: "Button",
    large: false,
    disabled: false,
    variant: "primary",
    isIconSearch: true,
    searchPhrase: "plus",
    hasTrailingIcon: null,
    // link: false,
    // href: null,
    // blank: false,
}

export function Button(props) {
    const {
        hasTrailingIcon,
        isIconSearch,
        chosenIcon,
        searchPhrase,
        label,
        variant,
        ...rest
    } = props

    const iconName = isIconSearch ? findIcon(searchPhrase) : chosenIcon

    const Icon = props.large ? Icons.lg[iconName] : Icons.sm[iconName]
    const AlignedIcon = withButtonAlignment(withRtlSupport(Icon))

    let bpkProps = { ...rest }
    if (variant !== "primary") {
        bpkProps[variant] = true
    }

    let contents
    if (hasTrailingIcon === null) {
        contents = label
    } else if (hasTrailingIcon) {
        contents = (
            <>
                {label} <AlignedIcon />
            </>
        )
    } else {
        contents = (
            <>
                <AlignedIcon /> {label}
            </>
        )
    }

    return <BpkButton {...bpkProps}>{contents}</BpkButton>
}

Button.defaultProps = defaultProps

addPropertyControls(Button, {
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Button",
        placeholder: "None",
    },
    variant: {
        type: ControlType.Enum,
        title: "Type",
        options: [
            "primary",
            "secondary",
            "featured",
            "destructive",
            "outline",
            "link",
        ],
        optionTitles: [
            "Primary",
            "Secondary",
            "Featured",
            "Destructive",
            "Outline",
            "Link",
        ],
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
        defaultValue: false,
        enabledTitle: "Disabled",
        disabledTitle: "Enabled",
    },
    // Icon Controls
    hasTrailingIcon: {
        type: ControlType.Enum,
        title: "Show Icon",
        defaultValue: null,
        optionTitles: ["None", "Left", "Right"],
        options: [null, false, true],
        displaySegmentedControl: true,
    },
    isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
        hidden(props) {
            return props.hasTrailingIcon === null
        },
    },
    chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props.isIconSearch === true || props.hasTrailingIcon === null
        },
    },
    searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return (
                props.isIconSearch === false || props.hasTrailingIcon === null
            )
        },
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
