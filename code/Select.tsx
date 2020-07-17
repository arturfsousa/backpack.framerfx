import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkFieldset from "backpack-transpiled/bpk-component-fieldset"

// @ts-ignore
import BpkSelect from "backpack-transpiled/bpk-component-select"

const defaultOptionsText =
    "Economy, Premium Economy, Business Class, First Class"

export function Select(props) {
    const {
        isFieldSet,
        required,
        label,
        description,
        validationMessage,
        large,
        disabled,
        onChange,
        ...rest
    } = props

    const [value, setValue] = React.useState(props.value)
    const [isValid, setIsValid] = React.useState(props.isValid)

    React.useEffect(() => setIsValid(props.isValid), [props.isValid])

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

    const control = (
        <BpkSelect
            {...rest}
            id="select"
            disabled={disabled}
            large={large}
            name="select"
            value={value}
            valid={isValid}
            onChange={handleChange}
        >
            {options}
        </BpkSelect>
    )

    const fieldSet = (
        <BpkFieldset disabled={disabled} required={required} label={label} description={description} validationMessage={validationMessage}>
            {control}
        </BpkFieldset>
    )

    return isFieldSet ? fieldSet : control
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
    isFieldSet: {
        type: ControlType.Boolean,
        title: "Field Set",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    required: {
        type: ControlType.Boolean,
        title: "Required",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
        hidden(props) {
            return props.isFieldSet === false
        },
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Label",
        placeholder: "None",
        hidden(props) {
            return props.isFieldSet === false
        },
    },
    description: {
        title: "Description",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props.isFieldSet === false
        },
    },
    validationMessage: {
        title: "Error",
        type: ControlType.String,
        defaultValue: "Please enter a value",
        placeholder: "None",
        hidden(props) {
            return props.isFieldSet === false
        },
    },
    isValid: {
        type: ControlType.Boolean,
        title: "Validation",
        defaultValue: true,
        enabledTitle: "Valid",
        disabledTitle: "Invalid",
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
        placeholder: "None",
        displayTextArea: true,
    },
})

function optionsFromText(text) {
    return text.split(",").map((item) => item.trim())
}
