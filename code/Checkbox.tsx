import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkCheckbox from "backpack-transpiled/bpk-component-checkbox"

export function Checkbox(props) {
    const {
        label,
        onChange,
        disabled,
        required,
        indeterminate,
        valid,
        smallLabel,
        white,
    } = props

    const name = label.trim().toLowerCase().split("/[s]+/").join("-")

    const [checked, setChecked] = React.useState(props.checked)
    React.useEffect(() => setChecked(props.checked), [props.checked])

    const handleChange = () => {
        setChecked(!checked)
        onChange && onChange()
    }

    return (
        <BpkCheckbox
            name={name}
            onChange={handleChange}
            label={label}
            checked={checked}
            disabled={disabled}
            required={required}
            indeterminate={indeterminate}
            valid={valid}
            smallLabel={smallLabel}
            white={white}
        />
    )
}

Checkbox.defaultProps = {
    height: 20,
    width: 240,
    checked: true,
    disabled: false,
    label: "Add nearby airports",
    white: false,
    smallLabel: false,
    indeterminate: false,
    required: false,
    valid: true,
}

addPropertyControls(Checkbox, {
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Add nearby airports",
    },
    white: {
        type: ControlType.Boolean,
        title: "Label Colour",
        defaultValue: false,
        enabledTitle: "White",
        disabledTitle: "Default",
    },
    smallLabel: {
        type: ControlType.Boolean,
        title: "Label Size",
        defaultValue: false,
        enabledTitle: "Small",
        disabledTitle: "Default",
    },
    checked: {
        type: ControlType.Boolean,
        title: "State",
        defaultValue: true,
        enabledTitle: "Checked",
        disabledTitle: "Unchecked",
    },
    indeterminate: {
        type: ControlType.Boolean,
        title: "Partial",
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
    },
    valid: {
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
        enabledTitle: "Disabled",
        disabledTitle: "Enabled",
    },
    onChange: {
        type: ControlType.EventHandler,
    },
})
