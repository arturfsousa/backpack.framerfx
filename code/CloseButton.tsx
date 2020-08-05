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
import BpkCloseButton from "backpack-transpiled/bpk-component-close-button"

export function CloseButton(props) {
    const { onClick, ...rest } = props

    return <BpkCloseButton label="Close" onClick={onClick} {...rest} />
}

CloseButton.defaultProps = {
    height: 24,
    width: 18,
    onClick: () => null,
}

addPropertyControls(CloseButton, {
    onClick: {
        type: ControlType.EventHandler,
    },
})

CloseButton.displayName = "Close Button"
