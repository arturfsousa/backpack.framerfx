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

// @ts-ignore
import BpkRadio from "backpack-transpiled/bpk-component-radio"

export function Radio(props) {
    const {
        name,
        label,
        onChange,
        disabled,
        valid,
        // smallLabel,
        white,
    } = props

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
    name: {
        title: "Input Name",
        type: ControlType.String,
        defaultValue: "radio",
        placeholder: "Enter a name",
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Add nearby airports",
        placeholder: "Enter a label",
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

Radio.displayName = "Radio Button"
