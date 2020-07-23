import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

export function Icon(props) {
    const {
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _isLarge,
        _tint,
        onClick,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = _isLarge ? Icons.lg[iconName] : Icons.sm[iconName]

    return <Icon fill={_tint} onClick={onClick} />
}

export function findIcon(_searchPhrase) {
    const formatedSearch = _searchPhrase.trim().toLowerCase()

    const isNotBlank = formatedSearch !== ""
    const exactMatch = iconNames.find((name) => name === formatedSearch)
    const isExactMatch = exactMatch !== undefined

    const regex = new RegExp(formatedSearch.split(/[\s-]+/).join("[-]*"))
    const found = iconNames.find((name) => regex.test(name))
    const isFound = found !== undefined && isNotBlank

    return isExactMatch ? exactMatch : isFound ? found : "exclamation"
}

Icon.defaultProps = {
    height: 18,
    width: 18,
    _isIconSearch: true,
    _chosenIcon: "flight",
    _searchPhrase: "flight",
    _isLarge: false,
    _tint: "#0099ff",
}

addPropertyControls(Icon, {
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
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props._isIconSearch === true
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "flight",
        placeholder: "None",
        hidden(props) {
            return props._isIconSearch === false
        },
    },
    _isLarge: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    _tint: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: "#0770e3",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
