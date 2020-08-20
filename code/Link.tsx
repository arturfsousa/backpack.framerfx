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
import { withDefaultProps } from "backpack-transpiled/bpk-react-utils"
// @ts-ignore
import BpkText from "backpack-transpiled/bpk-component-text"
// @ts-ignore
import BpkLink from "backpack-transpiled/bpk-component-link"

const largerTextStyleRegex = RegExp("^x+l$")

interface Props {
    height: number
    alternate?: boolean
    _textAlign?: "left" | "center" | "right"
    weight?: string
    _weightIfSmaller?: string
    _weightIfLarger?: string
    text?: string
    textStyle?:
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "xxl"
        | "xxxl"
        | "xxxxl"
        | "xxxxxl"
    onClick: any
}

const defaultProps: Props = {
    height: 20,
    text: "Find out more",
    textStyle: "base",
    weight: "regular",
    alternate: false,
    _textAlign: "left",
    onClick: () => null,
}

export function Link(props: Props) {
    const {
        text,
        textStyle,
        _weightIfSmaller,
        _weightIfLarger,
        alternate,
        _textAlign,
        onClick,
    } = props

    const weight = largerTextStyleRegex.test(props.textStyle)
        ? _weightIfLarger
        : _weightIfSmaller

    const Component = withDefaultProps(BpkText, {
        textStyle,
        weight,
    })

    return (
        <div style={{ textAlign: _textAlign }}>
            <Component>
                <BpkLink href="#" onClick={onClick} alternate={alternate}>
                    {text}
                </BpkLink>
            </Component>
        </div>
    )
}

Link.defaultProps = defaultProps

addPropertyControls(Link, {
    text: {
        type: ControlType.String,
        title: "Text",
        placeholder: "Enter some text",
        displayTextArea: true,
    },
    textStyle: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: "base",
        options: [
            "xs",
            "sm",
            "base",
            "lg",
            "xl",
            "xxl",
            "xxxl",
            "xxxxl",
            "xxxxxl",
        ],
    },
    // Weight can only be `black` if textStyle is `xl` or larger
    _weightIfSmaller: {
        type: ControlType.Enum,
        title: "Weight",
        defaultValue: "regular",
        options: ["regular", "bold"],
        optionTitles: ["Book", "Bold"],
        hidden(props) {
            return largerTextStyleRegex.test(props.textStyle)
        },
    },
    _weightIfLarger: {
        type: ControlType.Enum,
        title: "Weight",
        defaultValue: "regular",
        options: ["regular", "bold", "black"],
        optionTitles: ["Book", "Bold", "Black"],
        hidden(props) {
            return !largerTextStyleRegex.test(props.textStyle)
        },
    },
    alternate: {
        type: ControlType.Boolean,
        title: "Style",
        defaultValue: false,
        enabledTitle: "On Dark",
        disabledTitle: "On Light",
    },
    _textAlign: {
        type: ControlType.SegmentedEnum,
        options: ["left", "center", "right"],
        optionTitles: ["Left", "Center", "Right"],
        title: "Align",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
