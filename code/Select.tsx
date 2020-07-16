import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import BpkSelect from "backpack-transpiled/bpk-component-select"

const defaultOptionsText =
    "Economy, Premium Economy, Business Class, First Class"

export function Select(props) {
    const { large, disabled, onChange, ...rest } = props

    const [value, setValue] = React.useState(props.value)

    // React.useEffect(() => setValue(props.value), [props.value])

    const optionArray = props.options
        ? props.options
        : optionsFromText(props.optionsText)

    const options = optionArray.map((option, index) => {
        return (
            <option key={index} value={option}>
                {option}
            </option>
        )
    })

    const handleChange = (event) => {
        setValue(event.target.value)
        onChange && onChange(event)
    }

    return (
        <BpkSelect
            {...rest}
            id="select"
            disabled={disabled}
            large={large}
            name="select"
            value={value}
            onChange={handleChange}
        >
            {options}
        </BpkSelect>
    )
}

Select.defaultProps = {
    height: 36,
    width: 240,
    disabled: false,
    value: "",
    optionsText: defaultOptionsText,
    options: null,
    onChange: () => null,
}

addPropertyControls(Select, {
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
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    // value: {
    //     title: "Value",
    //     type: ControlType.String,
    //     defaultValue: "",
    // },
    optionsText: {
        type: ControlType.String,
        title: "Options",
        defaultValue: defaultOptionsText,
        displayTextArea: true,
    },
})

function optionsFromText(text) {
    return text.split(",").map((item) => item.trim())
}
