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
//     _label?: string
//     large?: boolean
//     disabled?: boolean
//     _variant?: "primary" | "secondary" | "featured" | "destructive" | "outline" | "link"
//     // link?: boolean
//     // href?: string
//     // blank?: boolean
//     _hasTrailingIcon?: boolean
//     onClick?: any
// }

const defaultProps = {
    height: 36,
    _label: "Button",
    large: false,
    disabled: false,
    _variant: "primary",
    _isIconSearch: true,
    _searchPhrase: "plus",
    _hasTrailingIcon: null,
    // link: false,
    // href: null,
    // blank: false,
}

export function Button(props) {
    const {
        _hasTrailingIcon,
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _label,
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

    let contents
    if (_hasTrailingIcon === null) {
        contents = _label
    } else if (_hasTrailingIcon) {
        contents = (
            <>
                {_label} <AlignedIcon />
            </>
        )
    } else {
        contents = (
            <>
                <AlignedIcon /> {_label}
            </>
        )
    }

    return <BpkButton {...bpkProps}>{contents}</BpkButton>
}

Button.defaultProps = defaultProps

addPropertyControls(Button, {
    _label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Button",
        placeholder: "None",
    },
    _variant: {
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
    _hasTrailingIcon: {
        type: ControlType.Enum,
        title: "Show Icon",
        defaultValue: null,
        optionTitles: ["None", "Left", "Right"],
        options: [null, false, true],
        displaySegmentedControl: true,
    },
    _isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
        hidden(props) {
            return props._hasTrailingIcon === null
        },
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return (
                props._isIconSearch === true || props._hasTrailingIcon === null
            )
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return (
                props._isIconSearch === false || props._hasTrailingIcon === null
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
