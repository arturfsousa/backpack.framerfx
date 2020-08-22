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
import BpkNudger from "backpack-transpiled/bpk-component-nudger"
// @ts-ignore
import BpkText from "backpack-transpiled/bpk-component-text"
// @ts-ignore
import BpkLabel from "backpack-transpiled/bpk-component-label"

export function Nudger(props) {
    const {
        min,
        max,
        buttonType,
        onChange,
        _isFieldSet,
        label,
        description,
    } = props

    const getValueWithinLimits = (input) => {
        if (input < min) {
            return min
        } else if (input > max) {
            return max
        } else {
            return input
        }
    }

    const [value, setValue] = React.useState(getValueWithinLimits(props.value))

    const handleChange = (value) => {
        setValue(value)
        onChange && onChange(value)
    }

    React.useEffect(() => {
        setValue(getValueWithinLimits(props.value))
    }, [props.value])

    const control = (
        <BpkNudger
            id="my-nudger"
            min={min}
            max={max}
            value={value}
            buttonType={buttonType}
            onChange={handleChange}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
        />
    )

    const isWhite = buttonType === "outline"

    const fieldSet = (
        <div>
            <BpkLabel htmlFor="my-nudger" white={isWhite}>
                {label}
            </BpkLabel>
            {control}
            {description && (
                <BpkText
                    style={isWhite ? { color: "white" } : null}
                    className="bpk-fieldset__description"
                >
                    {description}
                </BpkText>
            )}
        </div>
    )

    return _isFieldSet ? fieldSet : control
}

Nudger.defaultProps = {
    height: 43,
    width: 108,
    value: 1,
    min: 1,
    max: 10,
    buttonType: "secondary",
    _isFieldSet: false,
    onChange: () => null,
}

addPropertyControls(Nudger, {
    _isFieldSet: {
        type: ControlType.Boolean,
        title: "Field Set",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Label",
        placeholder: "None",
        hidden: ({ _isFieldSet }) => !_isFieldSet,
    },
    description: {
        title: "Description",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
        displayTextArea: true,
        hidden: ({ _isFieldSet }) => !_isFieldSet,
    },
    min: {
        title: "Min",
        type: ControlType.Number,
        defaultValue: 1,
        displayStepper: true,
    },
    max: {
        title: "Max",
        type: ControlType.Number,
        defaultValue: 10,
        displayStepper: true,
    },
    value: {
        title: "Value",
        type: ControlType.Number,
        defaultValue: 1,
        displayStepper: true,
    },
    buttonType: {
        title: "Style",
        type: ControlType.Enum,
        options: ["secondary", "outline"],
        optionTitles: ["On Light", "On Dark"],
        defaultValue: "secondary",
        displaySegmentedControl: true,
    },
    onChange: {
        type: ControlType.EventHandler,
    },
})
