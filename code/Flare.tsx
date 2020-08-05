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
import Pointer from "backpack-transpiled/bpk-component-flare/src/__generated__/js/pointer"
import {
    flareHeightDesktop,
    flareHeightMobile,
    // @ts-ignore
} from "backpack-transpiled/bpk-tokens/tokens/base.es6"

export function Flare(props) {
    const { _isDesktop, fill } = props

    return (
        <Pointer
            preserveAspectRatio="xMidYMid slice"
            width="100%"
            height={_isDesktop ? flareHeightDesktop : flareHeightMobile}
            fill={fill}
        />
    )
}

Flare.defaultProps = {
    width: 480,
    height: 24,
    _isDesktop: true,
    fill: colors["Sky White"],
}

addPropertyControls(Flare, {
    fill: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: colors["Sky White"],
    },
    _isDesktop: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: true,
        enabledTitle: "Desktop",
        disabledTitle: "Mobile",
    },
})
