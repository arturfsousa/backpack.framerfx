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

import BpkSwitch, {
    SWITCH_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-switch"

const switchTypes = Object.keys(SWITCH_TYPES)

export function Switch(props) {
    const { label, type, onChange } = props

    const [checked, setChecked] = React.useState(props.checked)
    React.useEffect(() => setChecked(props.checked), [props.checked])

    const handleChange = () => {
        const state = !checked
        setChecked(state)
        onChange && onChange(state)
    }

    return (
        <BpkSwitch
            type={type}
            onChange={handleChange}
            label={label}
            checked={checked}
        />
    )
}

Switch.defaultProps = {
    height: 30,
    width: 240,
    checked: true,
    label: "Add nearby airports",
}

addPropertyControls(Switch, {
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: switchTypes,
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Add nearby airports",
    },
    checked: {
        type: ControlType.Boolean,
        title: "State",
        defaultValue: true,
        enabledTitle: "On",
        disabledTitle: "Off",
    },
    onChange: {
        type: ControlType.EventHandler,
    },
})
