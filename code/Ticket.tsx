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
import BpkTicket from "backpack-transpiled/bpk-component-ticket"

export function Ticket(props) {
    const {
        orientation,
        padded,
        withNotches,
        children,
        stub,
        ...rest
    } = props

    const vertical = orientation === "vertical"
    const _children = getRelativeComponent(children)
    const _stub = getRelativeComponent(stub)

    return (
        <BpkTicket {...rest} padded={padded} vertical={vertical} withNotches={withNotches} stub={_stub} >
            {_children}
        </BpkTicket>
    )
}

function getRelativeComponent(component) {
    return React.Children.map(component, (child) =>
        React.cloneElement(child, {
            position: "relative",
            width: "100%",
            _constraints: {
                enabled: false,
            },
        })
    )
}

Ticket.defaultProps = {
    width: 680,
    height: 180,
    padded: true,
    vertical: false,
    withNotches: true,
}

addPropertyControls(Ticket, {
    orientation: {
        type: ControlType.Enum,
        title: "Orientation",
        defaultValue: "horizontal",
        options: ["horizontal", "vertical"],
        displaySegmentedControl: true,
    },
    padded: {
        type: ControlType.Boolean,
        title: "Padded",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    withNotches: {
        type: ControlType.Boolean,
        title: "Notches",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    children: {
        title: "Ticket",
        type: ControlType.ComponentInstance,
    },
    stub: {
        title: "Stub",
        type: ControlType.ComponentInstance,
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
