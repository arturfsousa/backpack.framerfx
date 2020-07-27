import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { findIcon } from "./Icon"
import { indentTitle } from "./lib/indentTitle"

// @ts-ignore
import BpkButton from "backpack-transpiled/bpk-component-button"
// @ts-ignore
import BpkLoadingButton, {
    ICON_POSITION,
} from "backpack-transpiled/bpk-component-loading-button"
import {
    withButtonAlignment,
    withRtlSupport,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-icon"
// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

const defaultProps = {
    height: 36,
    _label: "Button",
    large: false,
    disabled: false,
    _variant: "primary",
    _isIconSearch: true,
    _searchPhrase: "plus",
    _hasTrailingIcon: null,
    _duration: 2,
    _hasDuration: false,
    iconPosition: ICON_POSITION.TRAILING,
}

export function Button(props) {
    const {
        iconPosition,
        _hasTrailingIcon,
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _label,
        _variant,
        _hasDuration,
        _duration,
        onClick,
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

    const [loading, setLoading] = React.useState(false)

    const handleClick = () => {
        setLoading(true)

        window.setTimeout(() => {
            setLoading(false)
            onClick && onClick()
        }, _duration * 1000)
    }

    if (_hasDuration) {
        return (
            <BpkLoadingButton
                {...bpkProps}
                loading={loading}
                icon={<AlignedIcon />}
                iconDisabled={<AlignedIcon />}
                iconPosition={iconPosition}
                onClick={handleClick}
            >
                {_label}
            </BpkLoadingButton>
        )
    } else {
        return (
            <BpkButton {...bpkProps} onClick={onClick}>
                {contents}
            </BpkButton>
        )
    }
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
    // Loading Button Controls
    _hasDuration: {
        title: "Spinner",
        type: ControlType.Boolean,
        defaultValue: Button.defaultProps._hasDuration,
        enabledTitle: "On Click",
        disabledTitle: "Never",
    },
    _duration: {
        title: indentTitle("Time"),
        min: 0.1,
        max: 10,
        defaultValue: Button.defaultProps._duration,
        type: ControlType.Number,
        step: 0.1,
        hidden: ({ _hasDuration }) => !_hasDuration,
    },
    iconPosition: {
        type: ControlType.Enum,
        title: "Icon",
        defaultValue: ICON_POSITION.TRAILING,
        optionTitles: ["Left", "Right"],
        options: [ICON_POSITION.LEADING, ICON_POSITION.TRAILING],
        displaySegmentedControl: true,
        hidden: ({ _hasDuration }) => !_hasDuration,
    },
    // Icon Controls
    _hasTrailingIcon: {
        type: ControlType.Enum,
        title: "Icon",
        defaultValue: null,
        optionTitles: ["None", "Left", "Right"],
        options: [null, false, true],
        displaySegmentedControl: true,
        hidden: ({ _hasDuration }) => _hasDuration,
    },
    _isIconSearch: {
        type: ControlType.Boolean,
        title: indentTitle("Find Icon"),
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
        hidden(props) {
            return props._hasTrailingIcon === null && !props._hasDuration
        },
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: indentTitle("Icon Name"),
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return (
                props._isIconSearch === true ||
                (props._hasTrailingIcon === null && !props._hasDuration)
            )
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: indentTitle("Icon Name"),
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return (
                props._isIconSearch === false ||
                (props._hasTrailingIcon === null && !props._hasDuration)
            )
        },
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
