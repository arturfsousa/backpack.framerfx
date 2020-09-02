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

// @ts-ignore
import { borderRadiusSm } from "backpack-transpiled/bpk-tokens/tokens/base.es6"

export function Image(props) {
    const { isURL, isntRounded, url, image, onTap, ...rest } = props

    console.log(borderRadiusSm)

    return (
        <Frame
            {...rest}
            backgroundColor="transparent"
            radius={isntRounded ? 0 : borderRadiusSm}
            image={isURL ? url : image}
            onTap={onTap}
        />
    )
}

Image.defaultProps = {
    height: 128,
    width: 240,
    isURL: true,
    url:
        "https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg",
    isntRounded: true,
}

addPropertyControls(Image, {
    isURL: {
        type: ControlType.Boolean,
        title: "Source",
        defaultValue: true,
        enabledTitle: "URL",
        disabledTitle: "File",
    },
    image: {
        type: ControlType.Image,
        hidden(props) {
            return props.isURL === true
        },
    },
    url: {
        title: "URL",
        type: ControlType.String,
        defaultValue:
            "https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg",
        placeholder: "Enter a URL",
        hidden(props) {
            return props.isURL === false
        },
    },
    onTap: {
        type: ControlType.EventHandler,
    },
    isntRounded: {
        type: ControlType.Boolean,
        title: "Corners",
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Rounded",
    },
})
