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

import BpkProgress, {
    themeAttributes,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-progress"
// @ts-ignore
import BpkThemeProvider from "backpack-transpiled/bpk-theming"

export function ProgressBar(props) {
    const {
        stepped,
        small,
        min,
        max,
        value,
        progressBarFillColor,
        ...rest
    } = props

    const theme = {
        progressBarFillColor: progressBarFillColor,
    }

    return (
        <BpkThemeProvider theme={theme} themeAttributes={[...themeAttributes]}>
            <BpkProgress
                {...rest}
                min={min}
                max={max}
                value={value}
                stepped={stepped}
                small={small}
                aria-label="Progress"
            />
        </BpkThemeProvider>
    )
}

ProgressBar.defaultProps = {
    height: 12,
    width: 240,
    stepped: false,
    small: false,
    min: 0,
    max: 100,
    value: 25,
    progressBarFillColor: colors["Sky Blue"],
    stepColor: colors["Sky White"],
}

addPropertyControls(ProgressBar, {
    stepped: {
        type: ControlType.Boolean,
        title: "Type",
        defaultValue: false,
        enabledTitle: "Stepped",
        disabledTitle: "Default",
    },
    small: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Small",
        disabledTitle: "Default",
    },
    min: {
        title: "Min",
        type: ControlType.Number,
        defaultValue: 0,
    },
    max: {
        title: "Max",
        type: ControlType.Number,
        defaultValue: 100,
    },
    value: {
        title: "Value",
        type: ControlType.Number,
        defaultValue: 25,
    },
    // Theming
    progressBarFillColor: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: ProgressBar.defaultProps.progressBarFillColor,
    },
    stepColor: {
        title: "Step Colour",
        type: ControlType.Color,
        defaultValue: ProgressBar.defaultProps.stepColor,
        hidden: ({ stepped }) => !stepped,
    },
    // Events
    onComplete: {
        type: ControlType.EventHandler,
    },
    onCompleteTransitionEnd: {
        type: ControlType.EventHandler,
    },
})

ProgressBar.displayName = "Progress Bar"
