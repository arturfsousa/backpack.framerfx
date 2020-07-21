import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkRadio from "backpack-transpiled/bpk-component-radio"

export function Radio(props) {
    const {
        label,
        onChange,
        disabled,
        valid,
        // smallLabel,
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
        <BpkRadio
            name={name}
            onChange={handleChange}
            label={label}
            checked={checked}
            disabled={disabled}
            valid={valid}
            // smallLabel={smallLabel}
            white={white}
        />
    )
}

Radio.defaultProps = {
    height: 20,
    width: 240,
    checked: true,
    disabled: false,
    label: "Add nearby airports",
    white: false,
    // smallLabel: false,
    valid: true,
}

addPropertyControls(Radio, {
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
    // smallLabel: {
    //     type: ControlType.Boolean,
    //     title: "Label Size",
    //     defaultValue: false,
    //     enabledTitle: "Small",
    //     disabledTitle: "Default",
    // },
    checked: {
        type: ControlType.Boolean,
        title: "State",
        defaultValue: true,
        enabledTitle: "On",
        disabledTitle: "Off",
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
