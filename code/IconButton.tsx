import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { findIcon } from "./Icon"
import { indentTitle } from "./lib/indentTitle"

// @ts-ignore
import BpkButton from "backpack-transpiled/bpk-component-button"
import BpkLoadingButton, {
    ICON_POSITION,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-loading-button"
import {
    withButtonAlignment,
    withRtlSupport,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-icon"
// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

export function IconButton(props) {
    const {
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _variant,
        _hasDuration,
        _duration,
        onClick,
        ...rest
    } = props

    // Set button variant
    if (_variant !== "primary") {
        rest[_variant] = true
    }

    // Get icon
    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = props.large ? Icons.lg[iconName] : Icons.sm[iconName]
    const AlignedIcon = withButtonAlignment(withRtlSupport(Icon))

    // Handle loading button
    const [loading, setLoading] = React.useState(false)

    const handleClickWithDelay = () => {
        setLoading(true)

        window.setTimeout(() => {
            setLoading(false)
            onClick && onClick()
        }, _duration * 1000)
    }

    if (_hasDuration) {
        return (
            <BpkLoadingButton
                {...rest}
                iconOnly
                loading={loading}
                icon={<AlignedIcon />}
                iconDisabled={<AlignedIcon />}
                onClick={handleClickWithDelay}
            />
        )
    } else {
        return (
            <BpkButton {...rest} iconOnly onClick={onClick}>
                <AlignedIcon />
            </BpkButton>
        )
    }
}

IconButton.defaultProps = {
    height: 36,
    width: 36,
    large: false,
    disabled: false,
    _variant: "primary",
    _isIconSearch: true,
    _searchPhrase: "plus",
    _duration: 2,
    _hasDuration: false,
}

addPropertyControls(IconButton, {
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
    // Loading Button Controls
    _hasDuration: {
        title: "Spinner",
        type: ControlType.Boolean,
        defaultValue: IconButton.defaultProps._hasDuration,
        enabledTitle: "On Click",
        disabledTitle: "Never",
    },
    _duration: {
        title: indentTitle("Time"),
        min: 0.1,
        max: 10,
        defaultValue: IconButton.defaultProps._duration,
        type: ControlType.Number,
        step: 0.1,
        hidden: ({ _hasDuration }) => !_hasDuration,
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
        title: indentTitle("Icon Name"),
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props._isIconSearch === true
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: indentTitle("Icon Name"),
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return props._isIconSearch === false
        },
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})

IconButton.displayName = "Icon Button"
