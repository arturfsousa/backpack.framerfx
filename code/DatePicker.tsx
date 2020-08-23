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
import BpkDatepicker from "backpack-transpiled/bpk-component-datepicker"
// @ts-ignore
import BpkLabel from "backpack-transpiled/bpk-component-label"
// @ts-ignore
import BpkText from "backpack-transpiled/bpk-component-text"
// @ts-ignore
import BpkFormValidation from "backpack-transpiled/bpk-component-form-validation"
// @ts-ignore
import format = require("date-fns/format")
const formatDate = (date) => format(date, "DD/MM/YYYY")
const formatDateFull = (date) => format(date, "do MMMM YYYY")
const formatMonth = (date) => format(date, "MMMM YYYY")
const daysOfWeek = [
    {
        name: "Monday",
        nameAbbr: "Mon",
        index: 0,
        isWeekend: false,
    },
    {
        name: "Tuesday",
        nameAbbr: "Tue",
        index: 1,
        isWeekend: false,
    },
    {
        name: "Wednesday",
        nameAbbr: "Wed",
        index: 2,
        isWeekend: false,
    },
    {
        name: "Thursday",
        nameAbbr: "Thu",
        index: 3,
        isWeekend: false,
    },
    {
        name: "Friday",
        nameAbbr: "Fri",
        index: 4,
        isWeekend: false,
    },
    {
        name: "Saturday",
        nameAbbr: "Sat",
        index: 5,
        isWeekend: true,
    },
    {
        name: "Sunday",
        nameAbbr: "Sun",
        index: 6,
        isWeekend: true,
    },
]

export function DatePicker(props) {
    const {
        _isFieldSet,
        required,
        label,
        description,
        placeholder,
        validationMessage,
        disabled,
        onDateSelect,
        // onFocus,
        // onBlur,
    } = props

    const [selectedDate, setSelectedDate] = React.useState(null)

    const [valid, setValid] = React.useState(props.valid)
    React.useEffect(() => setValid(props.valid), [props.valid])

    const handleDateSelect = (date) => {
        setSelectedDate(date)
        setValid(null)
        onDateSelect && onDateSelect(date)
    }

    const control = (
        <BpkDatepicker
            id={label}
            daysOfWeek={daysOfWeek}
            weekStartsOn={0}
            changeMonthLabel="Change month"
            closeButtonText="Close"
            title={label}
            getApplicationElement={() => document.getElementById("pagewrap")}
            formatDate={formatDate}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            onDateSelect={handleDateSelect}
            date={selectedDate}
            inputProps={{
                placeholder: placeholder,
                valid: valid,
                disabled: disabled,
                // onFocus: () => {
                //     if (onFocus) onFocus()
                // },
                // onBlur: () => {
                //     if (onBlur) onBlur()
                // },
            }}
        />
    )

    const fieldSet = (
        <div>
            <BpkLabel
                htmlFor={label}
                required={required}
                disabled={disabled}
                valid={valid}
            >
                {label}
            </BpkLabel>
            {control}
            {description && (
                <BpkText className="bpk-fieldset__description">
                    {description}
                </BpkText>
            )}
            {valid !== null && (
                <BpkFormValidation id="my-date-validation" expanded={!valid}>
                    {validationMessage}
                </BpkFormValidation>
            )}
        </div>
    )

    return _isFieldSet ? fieldSet : control
}

DatePicker.defaultProps = {
    height: 36,
    width: 240,
    _isFieldSet: false,
    valid: null,
    label: "Date",
    placeholder: "Select a date",
}

addPropertyControls(DatePicker, {
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
        hidden: ({ _isFieldSet }) => !_isFieldSet,
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Date",
        placeholder: "None",
    },
    description: {
        title: "Description",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
        displayTextArea: true,
        hidden: ({ _isFieldSet }) => !_isFieldSet,
    },
    validationMessage: {
        title: "Error",
        type: ControlType.String,
        defaultValue: "Please select a date",
        placeholder: "None",
        hidden: ({ _isFieldSet }) => !_isFieldSet,
    },
    valid: {
        type: ControlType.Enum,
        title: "Validation",
        defaultValue: null,
        optionTitles: ["None", "Invalid"],
        options: [null, false],
        displaySegmentedControl: true,
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
        defaultValue: DatePicker.defaultProps.placeholder,
        placeholder: "None",
    },
    onDateSelect: { type: ControlType.EventHandler },
    // onFocus: { type: ControlType.EventHandler },
    // onBlur: { type: ControlType.EventHandler },
})

DatePicker.displayName = "Date Picker"
