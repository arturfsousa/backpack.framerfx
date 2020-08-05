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

import { colors } from "./canvas"
// @ts-ignore
import BpkPanel from "backpack-transpiled/bpk-component-panel"
// @ts-ignore
import { borderRadiusSm } from "backpack-transpiled/bpk-tokens/tokens/base.es6"

interface Props {
    children: NonNullable<React.ReactNode>
    padded?: boolean
}

export function Panel(props) {
    const {
        _hasDefaultStyle,
        color,
        backgroundColor,
        _text,
        children,
        ...rest
    } = props

    const cardRadiusStyle = props.padded
        ? null
        : { style: { borderRadius: borderRadiusSm } }

    const relativeChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, {
            position: "relative",
            width: "100%",
            _constraints: {
                enabled: false,
            },
            ...cardRadiusStyle,
        })
    )

    const style = _hasDefaultStyle
        ? null
        : { color: color, backgroundColor: backgroundColor, boxShadow: "none" }

    if (React.Children.count(children) === 0) {
        return (
            <BpkPanel {...rest} style={style}>
                {_text}
            </BpkPanel>
        )
    } else {
        return (
            <BpkPanel {...rest} style={style}>
                {relativeChildren}
            </BpkPanel>
        )
    }
}

Panel.defaultProps = {
    width: 360,
    height: 180,
    usesCustomStyle: false,
    _text:
        "We start by solving problems for our travellers, followed by our partners. Never selfish, we put the company before the team and the team before ourselves.",
    padded: true,
}

addPropertyControls(Panel, {
    fullWidth: {
        type: ControlType.Boolean,
        title: "Full Width",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    padded: {
        type: ControlType.Boolean,
        title: "Padded",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    _text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Panel.defaultProps._text,
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props.children.length > 0
        },
    },
    _hasDefaultStyle: {
        type: ControlType.Boolean,
        title: "Style",
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Custom",
    },
    color: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: colors["Sky White"],
        hidden(props) {
            return props._hasDefaultStyle
        },
    },
    backgroundColor: {
        title: "Background",
        type: ControlType.Color,
        defaultValue: colors["Sky Blue"],
        hidden(props) {
            return props._hasDefaultStyle
        },
    },
    // onClick: {
    //     type: ControlType.EventHandler,
    // },
})
