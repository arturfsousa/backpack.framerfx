import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkFieldset from "backpack-transpiled/bpk-component-fieldset"

import BpkInput, {
    INPUT_TYPES,
    CLEAR_BUTTON_MODES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-input"

export function Input(props) {
    const {
        isFieldSet,
        required,
        label,
        description,
        validationMessage,
        disabled,
        type,
        large,
        clearButtonMode,
        placeholder,
        onChange,
    } = props

    const [value, setValue] = React.useState(props.value)
    const [isValid, setIsValid] = React.useState(props.isValid)

    React.useEffect(() => setValue(props.value), [props.value])
    React.useEffect(() => setIsValid(props.isValid), [props.isValid])

    const handleChange = (event) => {
        setValue(event.target.value)
        onChange && onChange(event)
    }

    const control = (
        <BpkInput
            id={label}
            type={type}
            large={large}
            name={label}
            value={value}
            valid={isValid}
            disabled={disabled}
            onChange={handleChange}
            placeholder={placeholder}
            clearButtonMode={clearButtonMode}
            clearButtonLabel="Clear"
            onClear={() => setValue("")}
        />
    )

    const fieldSet = (
        <BpkFieldset disabled={disabled} required={required} label={label} description={description} validationMessage={validationMessage}>
            {control}
        </BpkFieldset>
    )

    return isFieldSet ? fieldSet : control
}

Input.defaultProps = {
    height: 36,
    width: 240,
    isField: true,
    isValid: null,
    label: "Label",
    placeholder: "Country, city or airport",
    value: "",
}

addPropertyControls(Input, {
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
        type: ControlType.Enum,
        title: "Validation",
        defaultValue: false,
        optionTitles: ["None", "Valid", "Invalid"],
        options: [null, true, false],
        displaySegmentedControl: true,
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    type: {
        title: "Type",
        type: ControlType.Enum,
        defaultValue: INPUT_TYPES.text,
        options: Object.keys(INPUT_TYPES),
        optionTitles: Object.keys(INPUT_TYPES).map((key) => INPUT_TYPES[key]),
    },
    clearButtonMode: {
        title: "Clear Mode",
        type: ControlType.Enum,
        defaultValue: CLEAR_BUTTON_MODES.never,
        options: Object.keys(CLEAR_BUTTON_MODES),
        optionTitles: Object.keys(CLEAR_BUTTON_MODES).map(
            (key) => CLEAR_BUTTON_MODES[key]
        ),
    },
    placeholder: {
        title: "Placeholder",
        type: ControlType.String,
        defaultValue: "Country, city or airport",
        placeholder: "None",
    },
    value: {
        title: "Value",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
    },
})
