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
import BpkLabel from "backpack-transpiled/bpk-component-label"

export function Label(props) {
    const { label, ...rest } = props

    return (
        <BpkLabel htmlFor={label} {...rest}>
            {label}
        </BpkLabel>
    )
}

Label.defaultProps = {
    height: 16,
    width: 180,
    label: "Label",
    required: false,
    valid: true,
    disabled: false,
    white: false,
}

addPropertyControls(Label, {
    label: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Label",
        placeholder: "Enter the label text",
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
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    white: {
        type: ControlType.Boolean,
        title: "Style",
        defaultValue: false,
        enabledTitle: "On Dark",
        disabledTitle: "On Light",
    },
})
