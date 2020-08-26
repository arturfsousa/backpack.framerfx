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
import BpkRating from "backpack-transpiled/bpk-component-rating"
import {
    RATING_SIZES,
    RATING_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-rating/src/common-types"

const ratingTypes = Object.keys(RATING_TYPES)
const ratingSizes = Object.keys(RATING_SIZES)

export function Rating(props) {
    const { _orientation, title, subtitle, value, type, size, ...rest } = props

    const vertical = _orientation === "vertical"

    return (
        <BpkRating
            {...rest}
            ariaLabel={`${value.toString()} ${title}`}
            title={title}
            subtitle={subtitle}
            value={value}
            type={type}
            size={size}
            vertical={vertical}
        />
    )
}

Rating.defaultProps = {
    height: 48,
    width: 180,
    value: 9,
    size: RATING_SIZES.base,
}

addPropertyControls(Rating, {
    value: {
        title: "Value",
        type: ControlType.Number,
        defaultValue: 9,
        min: 0,
        max: 10,
        displayStepper: true,
    },
    title: {
        title: "Title",
        type: ControlType.String,
        defaultValue: "Excellent",
        placeholder: "Enter a title",
    },
    subtitle: {
        title: "Subtitle",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: ratingTypes,
    },
    size: {
        type: ControlType.Enum,
        title: "Size",
        options: ratingSizes,
        defaultValue: Rating.defaultProps.size,
    },
    _orientation: {
        type: ControlType.Enum,
        title: "Orientation",
        defaultValue: "horizontal",
        options: ["horizontal", "vertical"],
        displaySegmentedControl: true,
    },
})
