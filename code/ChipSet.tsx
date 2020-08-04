import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import BpkSelectableChip, {
    BpkDismissibleChip,
    CHIP_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-chip"

import { getArrayFromText } from "./lib/getArrayFromText"

function getArray(array, text) {
    return array === null ? getArrayFromText(text) : array
}

const chipTypes = Object.keys(CHIP_TYPES)

const style: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "start",
    margin: "-.375rem",
}

export function ChipSet(props) {
    const { _areSelectable, ...rest } = props

    if (_areSelectable) {
        return <SelectableChipSet {...rest} />
    } else {
        return <DismissableChipSet {...rest} />
    }
}

function SelectableChipSet(props) {
    const { chips, chipsText, onChange, ...rest } = props

    const _chips = getArray(chips, chipsText)

    return (
        <div style={style}>
            {_chips.map((chip, index) => {
                const [selected, setSelected] = React.useState(false)
                const handleClick = () => {
                    const newState = !selected
                    setSelected(newState)
                    onChange && onChange({ index: index, selected: newState })
                }
                return (
                    <BpkSelectableChip
                        {...rest}
                        key={index}
                        accessibilityLabel="Toggle"
                        selected={selected}
                        onClick={handleClick}
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
    _areSelectable: false,
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
    _areSelectable: {
        type: ControlType.Boolean,
        title: "Action",
        defaultValue: false,
        enabledTitle: "Select",
        disabledTitle: "Dismiss",
    },
})

ChipSet.displayName = "Chip Set"
