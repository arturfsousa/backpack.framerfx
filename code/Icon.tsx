import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

export function Icon(props) {
    const { isIconSearch, choose, search, isLarge, tint, onClick, ...rest } = props

    const formatedSearch = search.trim().toLowerCase().split(' ').join('-')
    const isFound = iconNames.indexOf(formatedSearch) !== -1
    const iconName = isIconSearch ? isFound ? formatedSearch : "exclamation" : choose

    const Icon = isLarge ? Icons.lg[iconName] : Icons.sm[iconName]

    return <Icon fill={tint} onClick={onClick}/>
}

Icon.defaultProps = {
    height: 18,
    width: 18,
    choose: "flight",
    search: "flight",
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
    choose: {
        type: ControlType.Enum,
        title: "Icon Name",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props.isIconSearch === true
        },
    },
    search: {
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
        defaultValue: "#0099ff",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
