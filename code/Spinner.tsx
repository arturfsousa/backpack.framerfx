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
import { addPropertyControls, ControlType, useAnimation, motion } from "framer"
import { useTimeout } from "./lib/useTimeout"
import { indentTitle } from "./lib/indentTitle"

import {
    BpkSpinner,
    BpkLargeSpinner,
    BpkExtraLargeSpinner,
    SPINNER_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-spinner"

const spinnerTypes = Object.keys(SPINNER_TYPES)

export function Spinner(props) {
    const { _size, type, onTimeout, _duration, _fadeOut, _hasDuration } = props

    const controls = useAnimation()
    const animDuration = _fadeOut ? Math.min(_duration, 0.3) : 0
    const animDelay = _fadeOut ? _duration - animDuration : _duration

    useTimeout(() => {
        if (onTimeout && _hasDuration) onTimeout()
    }, _duration)

    useTimeout(() => {
        if (_hasDuration)
            controls.start({
                opacity: 0,
                transition: { duration: animDuration, ease: "easeIn" },
            })
    }, animDelay)

    const getSpinner = () => {
        switch (_size) {
            case "L":
                return <BpkLargeSpinner type={type} />
            case "XL":
                return <BpkExtraLargeSpinner type={type} />
            default:
                return <BpkSpinner type={type} />
        }
    }

    return (
        <motion.div
            animate={controls}
            style={{
                position: "relative",
                overflow: "show",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            {getSpinner()}
        </motion.div>
    )
}

Spinner.defaultProps = {
    height: 36,
    width: 36,
    type: SPINNER_TYPES.primary,
    _size: "S",
    _duration: 2,
    _hasDuration: false,
}

addPropertyControls(Spinner, {
    _size: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: Spinner.defaultProps._size,
        options: ["S", "L", "XL"],
        displaySegmentedControl: true,
    },
    type: {
        type: ControlType.Enum,
        title: "Colour",
        defaultValue: Spinner.defaultProps.type,
        options: spinnerTypes,
    },
    _hasDuration: {
        title: "Duration",
        type: ControlType.Boolean,
        defaultValue: Spinner.defaultProps._hasDuration,
        enabledTitle: "Timeout",
        disabledTitle: "Infinity",
    },
    _duration: {
        title: indentTitle("Time"),
        hidden: ({ _hasDuration }) => !_hasDuration,
        min: 0.1,
        max: 10,
        defaultValue: Spinner.defaultProps._duration,
        type: ControlType.Number,
        step: 0.1,
    },
    _fadeOut: {
        title: indentTitle("Fade Out"),
        hidden: ({ _hasDuration }) => !_hasDuration,
        type: ControlType.Boolean,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    onTimeout: {
        type: ControlType.EventHandler,
    },
})
