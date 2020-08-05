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
import BpkFieldset from "backpack-transpiled/bpk-component-fieldset"

import BpkInput, {
    INPUT_TYPES,
    CLEAR_BUTTON_MODES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-input"

export function Input(props) {
    const {
        _isFieldSet,
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
        onSubmit,
        onFocus,
        onBlur,
    } = props

    const [value, setValue] = React.useState(props.value)
    const [valid, setValid] = React.useState(props.valid)

    React.useEffect(() => setValue(props.value), [props.value])
    React.useEffect(() => setValid(props.valid), [props.valid])

    const handleChange = (event: React.ChangeEvent) => {
        const element = event.nativeEvent.target as HTMLInputElement
        const value = element.value
        setValue(value)
        onChange && onChange(value)
    }

    const control = (
        <BpkInput
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    if (onSubmit) onSubmit()
                }
            }}
            onFocus={() => {
                if (onFocus) onFocus()
            }}
            onBlur={() => {
                if (onBlur) onBlur()
            }}
            id={label}
            type={type}
            large={large}
            name={label}
            value={value}
            valid={valid}
            disabled={disabled}
            onChange={handleChange}
            placeholder={placeholder}
            clearButtonMode={clearButtonMode}
            clearButtonLabel="Clear"
            onClear={() => setValue("")}
        />
    )

    const fieldSet = (
        <BpkFieldset
            disabled={disabled}
            required={required}
            label={label}
            description={description}
            validationMessage={validationMessage}
        >
            {control}
        </BpkFieldset>
    )

    return _isFieldSet ? fieldSet : control
}

Input.defaultProps = {
    height: 36,
    width: 240,
    _isFieldSet: false,
    valid: null,
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
    _isFieldSet: {
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
            return props._isFieldSet === false
        },
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Label",
        placeholder: "None",
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    description: {
        title: "Description",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    validationMessage: {
        title: "Error",
        type: ControlType.String,
        defaultValue: "Please enter a value",
        placeholder: "None",
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    valid: {
        type: ControlType.Enum,
        title: "Validation",
        defaultValue: null,
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
    onSubmit: { type: ControlType.EventHandler },
    onFocus: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
})
