import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import BpkSelectableChip, {
    BpkDismissibleChip,
    CHIP_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-chip"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

import { findIcon } from "./Icon"
import { indentTitle } from "./lib/indentTitle"

const iconNames = Object.keys(Icons.sm)
const chipTypes = Object.keys(CHIP_TYPES)

export function Chip(props) {
    const {
        _selectableIconPosition,
        _isDismissibleWithoutIcon,
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _isSelectable,
        _isntSelected,
        text,
        onClick,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = Icons.sm[iconName]

    const [clicked, setClicked] = React.useState(
        _isSelectable && !_isntSelected
    )
    React.useEffect(() => setClicked(_isSelectable && !_isntSelected), [
        _isSelectable,
        _isntSelected,
    ])

    const handleClick = () => {
        setClicked(!clicked)
        onClick && onClick()
    }

    if (_isSelectable) {
        return (
            <BpkSelectableChip
                {...rest}
                leadingAccessoryView={
                    _selectableIconPosition === "left" ? <Icon /> : null
                }
                trailingAccessoryView={
                    _selectableIconPosition === "right" ? <Icon /> : null
                }
                accessibilityLabel="Toggle"
                selected={clicked}
                onClick={handleClick}
            >
                {text}
            </BpkSelectableChip>
        )
    } else {
        return (
            <div
                style={
                    clicked ? { display: "none" } : { display: "inline-block" }
                }
            >
                <BpkDismissibleChip
                    {...rest}
                    leadingAccessoryView={
                        _isDismissibleWithoutIcon ? null : <Icon />
                    }
                    accessibilityLabel="Close"
                    onClick={handleClick}
                >
                    {text}
                </BpkDismissibleChip>
            </div>
        )
    }
}

Chip.defaultProps = {
    height: 36,
    text: "Chip",
    type: CHIP_TYPES.primary,
    _selectableIconPosition: null,
    _isDismissibleWithoutIcon: true,
    _isIconSearch: false,
    _chosenIcon: "flight",
    _searchPhrase: "flight",
}

addPropertyControls(Chip, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: chipTypes,
        defaultValue: Chip.defaultProps.type,
    },
    _isSelectable: {
        type: ControlType.Boolean,
        title: "Action",
        defaultValue: true,
        enabledTitle: "Select",
        disabledTitle: "Dismiss",
    },
    _isntSelected: {
        type: ControlType.Boolean,
        title: indentTitle("State"),
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Selected",
        hidden: ({ _isSelectable }) => !_isSelectable,
    },
    // Icon Controls
    _selectableIconPosition: {
        type: ControlType.Enum,
        title: "Icon",
        defaultValue: null,
        optionTitles: ["None", "Left", "Right"],
        options: [null, "left", "right"],
        displaySegmentedControl: true,
        hidden: ({ _isSelectable }) => !_isSelectable,
    },
    _isDismissibleWithoutIcon: {
        type: ControlType.Boolean,
        title: "Icon",
        defaultValue: true,
        enabledTitle: "None",
        disabledTitle: "Left",
        hidden: ({ _isSelectable }) => _isSelectable,
    },
    _isIconSearch: {
        type: ControlType.Boolean,
        title: indentTitle("Find Icon"),
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
        hidden({
            _isSelectable,
            _selectableIconPosition,
            _isDismissibleWithoutIcon,
        }) {
            const hasIcon =
                (_isSelectable && _selectableIconPosition !== null) ||
                (!_isSelectable && !_isDismissibleWithoutIcon)
            return !hasIcon
        },
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: indentTitle("Icon Name"),
        defaultValue: "flight",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.sm[key]),
        hidden({
            _isIconSearch,
            _isSelectable,
            _selectableIconPosition,
            _isDismissibleWithoutIcon,
        }) {
            const hasIcon =
                (_isSelectable && _selectableIconPosition !== null) ||
                (!_isSelectable && !_isDismissibleWithoutIcon)
            return _isIconSearch || !hasIcon
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: indentTitle("Icon Name"),
        defaultValue: "flight",
        placeholder: "None",
        hidden({
            _isIconSearch,
            _isSelectable,
            _selectableIconPosition,
            _isDismissibleWithoutIcon,
        }) {
            const hasIcon =
                (_isSelectable && _selectableIconPosition !== null) ||
                (!_isSelectable && !_isDismissibleWithoutIcon)
            return !_isIconSearch || !hasIcon
        },
    },
    // Events
    onClick: {
        type: ControlType.EventHandler,
    },
})
