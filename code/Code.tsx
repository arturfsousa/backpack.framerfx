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
import { BpkCode, BpkCodeBlock } from "backpack-transpiled/bpk-component-code"

export function Code(props) {
    const { _isInline, text, ...rest } = props
    const Component = _isInline ? BpkCode : BpkCodeBlock
    return <Component {...rest}>{text}</Component>
}

Code.defaultProps = {
    height: 19,
    width: 301,
    text: 'import * as React from "react"',
    alternate: false,
    _isInline: true,
}

addPropertyControls(Code, {
    _isInline: {
        type: ControlType.Boolean,
        title: "Type",
        defaultValue: true,
        enabledTitle: "Inline",
        disabledTitle: "Block",
    },
    text: {
        title: "Code",
        type: ControlType.String,
        defaultValue: Code.defaultProps.text,
        displayTextArea: true,
    },
    alternate: {
        type: ControlType.Boolean,
        title: "Style",
        defaultValue: false,
        enabledTitle: "Alternate",
        disabledTitle: "Default",
    },
})
