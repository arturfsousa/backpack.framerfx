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
import { RenderTarget, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkTooltip from "backpack-transpiled/bpk-component-tooltip"

export function Tooltip(props) {
    const { text, ...rest } = props

    const isOnCanvas = RenderTarget.current() === RenderTarget.canvas

    const styleOnCanvas = isOnCanvas
        ? {
              background: "rgba(7, 112, 227, .1)",
              border: "1px solid rgba(7, 112, 227, .25)",
              color: "rgba(7, 112, 227, 0.5)",
              fontSize: 10,
              lineHeight: 1,
          }
        : null

    const caption = isOnCanvas ? (
        <span style={{ position: "relative", top: "-14px" }}>{text}</span>
    ) : null

    return (
        <BpkTooltip
            {...rest}
            id="my-tooltip"
            target={
                <div style={{ ...styleOnCanvas, height: "100%" }}>
                    {caption}
                </div>
            }
        >
            {text}
        </BpkTooltip>
    )
}

Tooltip.defaultProps = {
    height: 36,
    width: 180,
    text: "London Heathrow",
    padded: true,
    type: "light",
    placement: "bottom",
}

addPropertyControls(Tooltip, {
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Tooltip.defaultProps.text,
    },
    type: {
        title: "Style",
        type: ControlType.Enum,
        options: ["light", "dark"],
        optionTitles: ["Light", "Dark"],
        displaySegmentedControl: true,
    },
    placement: {
        title: "Placement",
        type: ControlType.Enum,
        options: ["bottom", "top", "left", "right"],
        optionTitles: ["Bottom", "Top", "Left", "Right"],
    },
    padded: {
        title: "Padded",
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
