import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

export function Icon(props) {
    const {
        isIconSearch,
        chosenIcon,
        searchPhrase,
        isLarge,
        tint,
        onClick,
        ...rest
    } = props

    const iconName = isIconSearch ? findIcon(searchPhrase) : chosenIcon
    const Icon = isLarge ? Icons.lg[iconName] : Icons.sm[iconName]
    
    return <Icon fill={tint} onClick={onClick} />
}

export function findIcon(searchPhrase) {
    const formatedSearch = searchPhrase.trim().toLowerCase()

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
    isIconSearch: true,
    chosenIcon: "flight",
    searchPhrase: "flight",
    isLarge: false,
    tint: "#0099ff",
}

addPropertyControls(Icon, {
    isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
    },
    chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props.isIconSearch === true
        },
    },
    searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "flight",
        placeholder: "None",
        hidden(props) {
            return props.isIconSearch === false
        },
    },
    isLarge: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    tint: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: "#0770e3",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
