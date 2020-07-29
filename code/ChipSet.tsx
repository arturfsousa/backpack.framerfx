import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { getArrayFromText } from "./lib/getArrayFromText"

// @ts-ignore
import BpkChip, { CHIP_TYPES } from "backpack-transpiled/bpk-component-chip"

const chipTypes = Object.keys(CHIP_TYPES)

export function ChipSet(props) {
    const { chipsText, onChange, ...rest } = props

    const [chips, setChips] = React.useState(getArrayFromText(chipsText))

    const handleClose = (index) => {
        const newChips = [...chips]
        newChips.splice(index, 1)
        setChips(newChips)
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
            {chips.map((chip, index) => {
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
    height: 36,
    chipsText: "BCN, CDG, EDI, FCO, JFK, LHR, TXL",
    type: CHIP_TYPES.neutral,
    dismissible: true,
    onChange: () => null,
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

ChipSet.defaultName = "Chip Set"
