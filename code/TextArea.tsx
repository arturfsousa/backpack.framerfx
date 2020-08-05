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
// @ts-ignore
import BpkTextarea from "backpack-transpiled/bpk-component-textarea"

export function TextArea(props) {
    const {
        _isFieldSet,
        _textareaHeight,
        required,
        label,
        description,
        validationMessage,
        disabled,
        placeholder,
        onChange,
        onFocus,
        onBlur,
    } = props

    const [value, setValue] = React.useState(props.value)
    const [valid, setValid] = React.useState(props.valid)

    React.useEffect(() => setValue(props.value), [props.value])
    React.useEffect(() => setValid(props.valid), [props.valid])

    const handleChange = (event: React.ChangeEvent) => {
        const element = event.nativeEvent.target as HTMLTextAreaElement
        const value = element.value
        setValue(value)
        onChange && onChange(value)
    }

    const control = (
        <BpkTextarea
            id={label}
            name={label}
            value={value}
            valid={valid}
            disabled={disabled}
            placeholder={placeholder}
            style={{ height: _textareaHeight }}
            onChange={handleChange}
            onFocus={() => {
                if (onFocus) onFocus()
            }}
            onBlur={() => {
                if (onBlur) onBlur()
            }}
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

TextArea.defaultProps = {
    height: 84,
    width: 240,
    isField: true,
    valid: null,
    label: "Label",
    placeholder: "Enter your message",
    value: "",
}

addPropertyControls(TextArea, {
    _textareaHeight: {
        title: "Height",
        type: ControlType.Number,
        defaultValue: 84,
        min: 84,
        step: 24,
        displayStepper: true,
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
    placeholder: {
        title: "Placeholder",
        type: ControlType.String,
        defaultValue: TextArea.defaultProps.placeholder,
        placeholder: "None",
    },
    value: {
        title: "Value",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
    },
    onFocus: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
})

TextArea.displayName = "Text Area"
