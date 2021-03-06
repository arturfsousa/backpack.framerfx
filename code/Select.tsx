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
import BpkSelect from "backpack-transpiled/bpk-component-select"

const defaultOptionsText =
    "Economy, Premium Economy, Business Class, First Class"

export function Select(props) {
    const {
        _isFieldSet,
        required,
        label,
        description,
        prompt,
        validationMessage,
        valid,
        large,
        disabled,
        options,
        _optionsText,
        onChange,
        onFocus,
        onBlur,
        ...rest
    } = props

    const [value, setValue] = React.useState("")
    const [_valid, setValid] = React.useState(valid)

    React.useEffect(() => setValid(valid), [valid])

    const optionArray = options
        ? options
        : optionsFromText(_optionsText)

    const _options = optionArray.map((option, index) => {
        return (
            <option key={index} value={option}>
                {option}
            </option>
        )
    })

    const handleChange = (event: React.ChangeEvent) => {
        const element = event.nativeEvent.target as HTMLSelectElement
        const value = element.value
        setValue(value)
        onChange && onChange(value)
    }

    const promptOption =
        prompt === "" ? null : (
            <option key={-1} value="" disabled>
                {prompt}
            </option>
        )

    const control = (
        <BpkSelect
            {...rest}
            id="select"
            disabled={disabled}
            large={large}
            name="select"
            value={value}
            valid={_valid}
            onChange={handleChange}
            onFocus={() => {
                if (onFocus) onFocus()
            }}
            onBlur={() => {
                if (onBlur) onBlur()
            }}
        >
            {promptOption}
            {_options}
        </BpkSelect>
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

Select.defaultProps = {
    height: 36,
    width: 240,
    _isFieldSet: false,
    disabled: false,
    // value: "",
    prompt: "Please Select",
    _optionsText: defaultOptionsText,
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
    // value: {
    //     title: "Value",
    //     type: ControlType.String,
    //     defaultValue: "",
    // },
    _optionsText: {
        type: ControlType.String,
        title: "Options",
        defaultValue: defaultOptionsText,
        placeholder: "None",
        displayTextArea: true,
    },
    prompt: {
        title: "Prompt",
        type: ControlType.String,
        defaultValue: "Please Select",
        placeholder: "None",
    },
    onChange: { type: ControlType.EventHandler },
    onFocus: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
})

function optionsFromText(text) {
    return text.split(",").map((item) => item.trim())
}
