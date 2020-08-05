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
import * as Icons from "backpack-transpiled/bpk-component-icon/all"

const iconNames = Object.keys(Icons.lg)

export function Icon(props) {
    const {
        _isIconSearch,
        _chosenIcon,
        _searchPhrase,
        _isLarge,
        _isScaled,
        _tint,
        onClick,
        ...rest
    } = props

    const iconName = _isIconSearch ? findIcon(_searchPhrase) : _chosenIcon
    const Icon = _isLarge ? Icons.lg[iconName] : Icons.sm[iconName]

    const scaledProps = _isScaled
        ? {
              viewBox: "0 0 24 24",
              style: {
                  width: "100%",
                  height: "100%",
              },
          }
        : null

    return (
        <Icon
            {...rest}
            {...scaledProps}
            fill={_tint}
            onClick={onClick}
        />
    )
}

export function findIcon(_searchPhrase) {
    const formatedSearch = _searchPhrase.trim().toLowerCase()

    const isNotBlank = formatedSearch !== ""
    const exactMatch = iconNames.find((name) => name === formatedSearch)
    const isExactMatch = exactMatch !== undefined

    const regex = new RegExp(formatedSearch.split(/[\s-]+/).join("[-]*"))
    const found = iconNames.find((name) => regex.test(name))
    const isFound = found !== undefined && isNotBlank

    return isExactMatch ? exactMatch : isFound ? found : "exclamation"
}

Icon.defaultProps = {
    height: 18,
    width: 18,
    _isIconSearch: true,
    _chosenIcon: "flight",
    _searchPhrase: "flight",
    _isLarge: false,
    _isScaled: false,
    _tint: "#0099ff",
}

addPropertyControls(Icon, {
    _isIconSearch: {
        type: ControlType.Boolean,
        title: "Find Icon",
        defaultValue: false,
        enabledTitle: "Search",
        disabledTitle: "Choose",
    },
    _chosenIcon: {
        type: ControlType.Enum,
        title: "Icon Name",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.lg[key]),
        hidden(props) {
            return props._isIconSearch === true
        },
    },
    _searchPhrase: {
        type: ControlType.String,
        title: "Icon Name",
        defaultValue: "flight",
        placeholder: "None",
        hidden(props) {
            return props._isIconSearch === false
        },
    },
    _isLarge: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    _isScaled: {
        type: ControlType.Boolean,
        title: "Scale",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    _tint: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: "#0770e3",
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
