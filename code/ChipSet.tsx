/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { getArrayFromText } from "./lib/getArrayFromText"

function getArray(array, text) {
    return array === null ? getArrayFromText(text) : array
}

const iconNames = Object.keys(Icons.sm)
const chipTypes = Object.keys(CHIP_TYPES)

const style: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "start",
    margin: "-.375rem",
}

export function ChipSet(props) {
    const {
        _selectableIconPosition,
        _isDismissibleWithoutIcon,
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _isSelectable,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = Icons.sm[iconName]

    if (_isSelectable) {
        const leadingAccessoryView =
            _selectableIconPosition === "left" ? <Icon /> : null

        const trailingAccessoryView =
            _selectableIconPosition === "right" ? <Icon /> : null

        return (
            <SelectableChipSet
                {...rest}
                leadingAccessoryView={leadingAccessoryView}
                trailingAccessoryView={trailingAccessoryView}
            />
        )
    } else {
        const leadingAccessoryView = _isDismissibleWithoutIcon ? null : <Icon />

        return (
            <DismissableChipSet
                {...rest}
                leadingAccessoryView={leadingAccessoryView}
            />
        )
    }
}

function SelectableChipSet(props) {
    const { _isRadio, chips, chipsText, onChange, ...rest } = props

    const [radioChoice, setRadioChoice] = React.useState(0)

    const _chips = getArray(chips, chipsText)

    return (
        <div style={style}>
            {_chips.map((chip, index) => {
                const [selected, setSelected] = React.useState(false)
                const handleCheck = () => {
                    const newState = !selected
                    setSelected(newState)
                    onChange && onChange({ index: index, selected: newState })
                }
                const handleRadio = (index) => {
                    setRadioChoice(index)
                    onChange && onChange({ index: index, selected: true })
                }
                return (
                    <BpkSelectableChip
                        {...rest}
                        key={index}
                        accessibilityLabel="Toggle"
                        selected={_isRadio ? index === radioChoice : selected}
                        onClick={
                            _isRadio ? () => handleRadio(index) : handleCheck
                        }
                        style={{ margin: ".375rem" }}
                    >
                        {chip}
                    </BpkSelectableChip>
                )
            })}
        </div>
    )
}

function DismissableChipSet(props) {
    const { chips, chipsText, onChange, ...rest } = props

    const [stateChips, setStateChips] = React.useState(
        getArray(chips, chipsText)
    )
    React.useEffect(() => setStateChips(getArray(chips, chipsText)), [
        chips,
        chipsText,
    ])

    const handleClose = (index) => {
        const newChips = [...stateChips]
        newChips.splice(index, 1)
        setStateChips(newChips)
        onChange && onChange(newChips)
    }

    return (
        <div style={style}>
            {stateChips.map((chip, index) => {
                return (
                    <BpkDismissibleChip
                        {...rest}
                        key={index}
                        accessibilityLabel="Close"
                        onClick={() => handleClose(index)}
                        style={{ margin: ".375rem" }}
                    >
                        {chip}
                    </BpkDismissibleChip>
                )
            })}
        </div>
    )
}

ChipSet.defaultProps = {
    width: 360,
    height: 84,
    chipsText: "BCN, CDG, EDI, FCO, JFK, LHR, TXL",
    type: CHIP_TYPES.primary,
    _isSelectable: false,
    _isRadio: false,
    _selectableIconPosition: null,
    _isDismissibleWithoutIcon: true,
    _isIconSearch: false,
    _chosenIcon: "flight",
    _searchPhrase: "flight",
    onChange: () => null,
    chips: null,
}

addPropertyControls(ChipSet, {
    chipsText: {
        type: ControlType.String,
        title: "Chips",
        defaultValue: ChipSet.defaultProps.chipsText,
        placeholder: "Enter a comma-separated list",
        displayTextArea: true,
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: chipTypes,
        defaultValue: ChipSet.defaultProps.type,
    },
    _isSelectable: {
        type: ControlType.Boolean,
        title: "Action",
        defaultValue: false,
        enabledTitle: "Select",
        disabledTitle: "Dismiss",
    },
    _isRadio: {
        type: ControlType.Boolean,
        title: indentTitle("Choice"),
        defaultValue: false,
        enabledTitle: "Radio",
        disabledTitle: "Multiple",
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
})

ChipSet.displayName = "Chip Set"
