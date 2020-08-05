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
import BpkBadge, { BADGE_TYPES } from "backpack-transpiled/bpk-component-badge"
// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

import { findIcon } from "./Icon"

const iconNames = Object.keys(Icons.sm)

interface Props {
    text?: string
    type?:
        | "warning"
        | "success"
        | "destructive"
        | "light"
        | "inverse"
        | "outline"
    centered?: boolean
    docked?: "left" | "right"
    _hasIcon?: boolean
    _isIconSearch?: boolean
    _chosenIcon?: string
    _searchPhrase?: string
    onClick?: any
}

const defaultProps: Props = {
    text: "Badge",
    type: BADGE_TYPES.warning,
    centered: false,
    docked: null,
    _hasIcon: true,
    _isIconSearch: false,
    _chosenIcon: "flight",
    _searchPhrase: "flight",
}

export function Badge(props: Props) {
    const {
        text,
        _hasIcon,
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon

    const Icon = Icons.sm[iconName]

    return (
        <BpkBadge {...rest}>
            {_hasIcon ? <Icon /> : null}
            {text}
        </BpkBadge>
    )
}

Badge.defaultProps = defaultProps

addPropertyControls(Badge, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: [
            BADGE_TYPES.warning,
            BADGE_TYPES.success,
            BADGE_TYPES.destructive,
            BADGE_TYPES.light,
            BADGE_TYPES.inverse,
            BADGE_TYPES.outline,
        ],
    },
    // centered: {
    //     type: ControlType.Boolean,
    //     title: "Centered",
    // },
    docked: {
        type: ControlType.Enum,
        title: "Docked",
        options: [null, "left", "right"],
        optionTitles: ["No", "Left", "Right"],
        displaySegmentedControl: true,
    },
    // Icon Controls
    _hasIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    _isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
        hidden(props) {
            return props._hasIcon === null
        },
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        defaultValue: "plus",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.sm[key]),
        hidden(props) {
            return props._isIconSearch === true || props._hasIcon === false
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "plus",
        placeholder: "None",
        hidden(props) {
            return props._isIconSearch === false || props._hasIcon === false
        },
    },
    // onClick: {
    //     type: ControlType.EventHandler,
    // },
})
