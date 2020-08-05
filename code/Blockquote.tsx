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
import BpkBlockquote from "backpack-transpiled/bpk-component-blockquote"

interface Props {
    text?: string
    extraSpace?: boolean
}

const defaultProps: Props = {
    text:
        "We start by solving problems for our travellers, followed by our partners. Never selfish, we put the company before the team and the team before ourselves.",
    extraSpace: false,
}

export function Blockquote(props: Props) {
    const { text, ...rest } = props

    return <BpkBlockquote {...rest}>{text}</BpkBlockquote>
}

Blockquote.defaultProps = defaultProps

addPropertyControls(Blockquote, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue:
            "We start by solving problems for our travellers, followed by our partners. Never selfish, we put the company before the team and the team before ourselves.",
        placeholder: "Enter a quote",
        displayTextArea: true,
    },
    extraSpace: {
        type: ControlType.Boolean,
        title: "Extra Space",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
