import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkButton from "backpack-transpiled/bpk-component-button"
// @ts-ignore
import { withButtonAlignment, withRtlSupport } from "backpack-transpiled/bpk-component-icon"
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
    width: 36,
    // label: "Button",
    large: false,
    disabled: false,
    variant: "primary",
    // link: false,
    // href: null,
    // blank: false,
}

export function IconButton(props) {
    const { isIconSearch, choose, search, variant, ...rest } = props

    // Icon
    const formatedSearch = search.trim().toLowerCase().split(' ').join('-')
    const isFound = iconNames.indexOf(formatedSearch) !== -1
    const iconName = isIconSearch ? isFound ? formatedSearch : "exclamation" : choose

    const Icon = props.large ? Icons.lg[iconName] : Icons.sm[iconName]
    const AlignedIcon = withButtonAlignment(withRtlSupport(Icon))

    let bpkProps = { ...rest }
    if (variant !== "primary") {
        bpkProps[variant] = true
    }

    return <BpkButton {...bpkProps} iconOnly><AlignedIcon /></BpkButton>
}

IconButton.defaultProps = defaultProps

addPropertyControls(IconButton, {
    // label: {
    //     type: ControlType.String,
    //     title: "Label",
    //     defaultValue: "Button",
    //     placeholder: "None",
    // },
    variant: {
        type: ControlType.Enum,
        title: "Type",
        options: ["primary", "secondary", "featured", "destructive", "outline"],
        optionTitles: ["Primary", "Secondary", "Featured", "Destructive", "Outline"],
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
    isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
    },
    choose: {
        type: ControlType.Enum,
        title: "Icon Name",
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props.isIconSearch === true
        },
    },
    search: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return props.isIconSearch === false
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
