import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'backpack-transpiled/bpk-component-input'

export function Input(props) {
    const { type, large, clearButtonMode, placeholder, ...rest } = props

    const [value, setValue] = React.useState(props.value)

    React.useEffect(() => setValue(props.value), [props.value])

    return (
        <BpkInput
            id="id"
            type={type}
            large={large}
            name="input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            clearButtonMode={clearButtonMode}
            clearButtonLabel="Clear"
            onClear={() => setValue("")}
        />
    )
}

Input.defaultProps = {
    height: 36,
    width: 240,
    placeholder: "Country, city or airport",
    value: "",
}

addPropertyControls(Input, {
    type: {
        title: "Type",
        type: ControlType.Enum,
        defaultValue: INPUT_TYPES.text,
        options: Object.keys(INPUT_TYPES),
        optionTitles: Object.keys(INPUT_TYPES).map(key => INPUT_TYPES[key]),
    },
    large: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small"
    },
    clearButtonMode: {
        title: "Clear Mode",
        type: ControlType.Enum,
        defaultValue: CLEAR_BUTTON_MODES.never,
        options: Object.keys(CLEAR_BUTTON_MODES),
        optionTitles: Object.keys(CLEAR_BUTTON_MODES).map(key => CLEAR_BUTTON_MODES[key]),
    },
    placeholder: {
        title: "Placeholder",
        type: ControlType.String,
        defaultValue: "Country, city or airport",
    },
    value: {
        title: "Value",
        type: ControlType.String,
        defaultValue: "",
    },
})
