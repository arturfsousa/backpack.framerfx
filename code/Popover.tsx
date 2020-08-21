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
import { Frame, RenderTarget, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkPopover from "backpack-transpiled/bpk-component-popover"

import {
    borderRadiusSm,
    spacingSm,
    breakpointMobile,
    // @ts-ignore
} from "backpack-transpiled/bpk-tokens/tokens/base.es6"

export function Popover(props) {
    const {
        label,
        _text,
        closeButtonText,
        _isTextContent,
        _component,
        target,
        ...rest
    } = props

    const [isOpen, setIsOpen] = React.useState(false)

    if (RenderTarget.current() === RenderTarget.canvas) {
        const caption = (
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: "-14px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    color: "rgba(0, 166, 152, 0.5)",
                    fontSize: 10,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                {label !== "" ? label : _text}
            </div>
        )

        return (
            <>
                <Frame
                    size="100%"
                    background="rgba(0, 166, 152, .1)"
                    border="1px solid rgba(0, 166, 152, .25)"
                >
                    {caption}
                </Frame>
                {target}
            </>
        )
    } else {
        const contentStyle = props.padded
            ? {
                  maxWidth: `calc(${breakpointMobile} - 2px - 2 * ${spacingSm})`,
              }
            : {
                  borderRadius: borderRadiusSm,
                  maxWidth: `calc(${breakpointMobile} - 2px)`,
              }

        const relativeChildren = React.Children.map(_component, (child) =>
            React.cloneElement(child, {
                position: "relative",
                style: { ...contentStyle },
            })
        )

        const contents = _isTextContent ? _text : relativeChildren

        return (
            <BpkPopover
                {...rest}
                id="my-tooltip"
                target={
                    <div
                        style={{
                            height: "100%",
                            cursor: "pointer",
                        }}
                        onClick={() => setIsOpen(true)}
                    >
                        {target}
                    </div>
                }
                label={label !== "" ? label : "Label"}
                labelAsTitle={label !== ""}
                closeButtonText={
                    closeButtonText !== "" ? closeButtonText : "Close"
                }
                closeButtonIcon={closeButtonText === ""}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {contents}
            </BpkPopover>
        )
    }
}

Popover.defaultProps = {
    height: 36,
    width: 180,
    label: "Label",
    _text:
        "Popovers display content or functionality that is related to a particular element",
    closeButtonText: "Close",
    padded: true,
    placement: "bottom",
    _component: null,
    target: null,
}

addPropertyControls(Popover, {
    _isTextContent: {
        title: "Content",
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Text",
        disabledTitle: "Component",
    },
    _text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: Popover.defaultProps._text,
        displayTextArea: true,
        placeholder: "Enter a message",
        hidden: ({ _isTextContent }) => !_isTextContent,
    },
    _component: {
        title: "Component",
        type: ControlType.ComponentInstance,
        hidden: ({ _isTextContent }) => _isTextContent,
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: Popover.defaultProps.label,
        placeholder: "None",
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
    target: {
        title: "Target",
        type: ControlType.ComponentInstance,
    },
})
