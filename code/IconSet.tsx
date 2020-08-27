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
import { Frame, addPropertyControls, ControlType } from "framer"

import { colors } from "./canvas"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"
// @ts-ignore
import { spacingSm as spacing } from "backpack-transpiled/bpk-tokens/tokens/base.es6"

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "start",
}

export function IconSet(props) {
    const { _isLarge, _tint } = props

    const iconNames = _isLarge ? Object.keys(Icons.lg) : Object.keys(Icons.sm)

    return (
        <div style={containerStyle}>
            {iconNames.sort().map((name, index) => {
                const Icon = _isLarge ? Icons.lg[name] : Icons.sm[name]
                return (
                    <Frame
                        position="relative"
                        width="auto"
                        height="auto"
                        background={null}
                        key={index}
                        style={{ padding: spacing }}
                        whileHover={{ scale: 1.75 }}
                    >
                        <Icon fill={_tint} />
                    </Frame>
                )
            })}
        </div>
    )
}

IconSet.defaultProps = {
    width: 900,
    height: 780,
    _isLarge: true,
    _tint: colors["Sky White"],
}

addPropertyControls(IconSet, {
    _isLarge: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: true,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    _tint: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: colors["Sky Gray"],
    },
})

IconSet.displayName = "Icon Set"
