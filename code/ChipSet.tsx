import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { getArrayFromText } from "./lib/getArrayFromText"

// @ts-ignore
import BpkChip, { CHIP_TYPES } from "backpack-transpiled/bpk-component-chip"

const chipTypes = Object.keys(CHIP_TYPES)

export function ChipSet(props) {
    const { chips, chipsText, onChange, ...rest } = props

    const getChips = () => chips === null ? getArrayFromText(chipsText) : chips

    const [stateChips, setStateChips] = React.useState(getChips())
    React.useEffect(() => setStateChips(getChips()), [chipsText, chips])

    const handleClose = (index) => {
        const newChips = [...stateChips]
        newChips.splice(index, 1)
        setStateChips(newChips)
        onChange && onChange(newChips)
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                alignContent: "start",
                margin: "-.375rem",
            }}
        >
            {stateChips.map((chip, index) => {
                return (
                    <BpkChip
                        {...rest}
                        key={index}
                        onClose={() => handleClose(index)}
                        style={{ margin: ".375rem" }}
                    >
                        {chip}
                    </BpkChip>
                )
            })}
        </div>
    )
}

ChipSet.defaultProps = {
    width: 360,
    height: 84,
    chipsText: "BCN, CDG, EDI, FCO, JFK, LHR, TXL",
    type: CHIP_TYPES.neutral,
    dismissible: true,
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
        defaultValue: CHIP_TYPES.neutral,
    },
    dismissible: {
        type: ControlType.Boolean,
        title: "Dismissible",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})

ChipSet.displayName = "Chip Set"
