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
import BpkPopover from "backpack-transpiled/bpk-component-popover"

import {
    borderRadiusSm,
    spacingSm,
    breakpointMobile,
    // @ts-ignore
} from "backpack-transpiled/bpk-tokens/tokens/base.es6"

export function Popover(props) {
    const { label, text, closeButtonText, children, ...rest } = props

    const isOnCanvas = RenderTarget.current() === RenderTarget.canvas

    const styleOnCanvas: React.CSSProperties = isOnCanvas
        ? {
              background: "rgba(0, 166, 152, .1)",
              border: "1px solid rgba(0, 166, 152, .25)",
              color: "rgba(0, 166, 152, 0.5)",
              fontSize: 10,
              lineHeight: 1,
          }
        : null

    const caption = isOnCanvas ? (
        <div
            style={{
                position: "relative",
                top: "-14px",
                width: "200px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            }}
        >
            {label !== "" ? label : text}
        </div>
    ) : null

    const contentStyle = props.padded
        ? {
              // width - padding - border
              maxWidth: `calc(${breakpointMobile} - 2 * ${spacingSm} - 2px)`,
          }
        : { borderRadius: borderRadiusSm, maxWidth: breakpointMobile }

    const relativeChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, {
            position: "relative",
            style: { ...contentStyle },
        })
    )

    const contents =
        React.Children.count(children) === 0 ? text : relativeChildren

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <BpkPopover
            {...rest}
            id="my-tooltip"
            target={
                <div
                    style={{ ...styleOnCanvas, height: "100%", cursor: "pointer" }}
                    onClick={() => setIsOpen(true)}
                >
                    {caption}
                </div>
            }
            label={label !== "" ? label : "Label"}
            labelAsTitle={label !== ""}
            closeButtonText={closeButtonText !== "" ? closeButtonText : "Close"}
            closeButtonIcon={closeButtonText === ""}
            isOpen={isOnCanvas ? false : isOpen}
            onClose={() => setIsOpen(false)}
        >
            {contents}
        </BpkPopover>
    )
}

Popover.defaultProps = {
    height: 36,
    width: 180,
    label: "Label",
    text:
        "Popovers display content or functionality that is related to a particular element",
    closeButtonText: "Close",
    padded: true,
    placement: "bottom",
}

addPropertyControls(Popover, {
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: Popover.defaultProps.label,
        placeholder: "None",
    },
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Popover.defaultProps.text,
        displayTextArea: true,
        placeholder: "Enter a message",
        hidden(props) {
            return props.children.length > 0
        },
    },
    closeButtonText: {
        title: "Close Text",
        type: ControlType.String,
        defaultValue: Popover.defaultProps.closeButtonText,
        placeholder: "None",
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
