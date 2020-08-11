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
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkFormValidation from "backpack-transpiled/bpk-component-form-validation"

export function Validation(props) {
    const { id, expanded, text, ...rest } = props

    return (
        <BpkFormValidation {...rest} id={id} expanded={expanded}>
            {text}
        </BpkFormValidation>
    )
}

Validation.defaultProps = {
    height: 20,
    width: 200,
    text: "This option is required",
    id: "my-form-validation",
    expanded: true,
}

addPropertyControls(Validation, {
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Validation.defaultProps.text,
        displayTextArea: true,
    },
})

Validation.displayName = "Validation Message"
