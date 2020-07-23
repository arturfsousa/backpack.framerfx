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
//     _variant?: "primary" | "secondary" | "featured" | "destructive" | "outline" | "link"
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
    _variant: "primary",
    _isIconSearch: true,
    _searchPhrase: "plus",
    // link: false,
    // href: null,
    // blank: false,
}

export function IconButton(props) {
    const {
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _variant,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = props.large ? Icons.lg[iconName] : Icons.sm[iconName]
    const AlignedIcon = withButtonAlignment(withRtlSupport(Icon))

    let bpkProps = { ...rest }
    if (_variant !== "primary") {
        bpkProps[_variant] = true
    }

    return (
        <BpkButton {...bpkProps} iconOnly>
            <AlignedIcon />
        </BpkButton>
    )
}

IconButton.defaultProps = defaultProps

addPropertyControls(IconButton, {
    // label: {
    //     type: ControlType.String,
    //     title: "Label",
    //     defaultValue: "Button",
    //     placeholder: "None",
    // },
    _variant: {
        type: ControlType.Enum,
        title: "Type",
        options: ["primary", "secondary", "featured", "destructive", "outline"],
        optionTitles: [
            "Primary",
            "Secondary",
            "Featured",
            "Destructive",
            "Outline",
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
    _isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props._isIconSearch === true
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return props._isIconSearch === false
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
