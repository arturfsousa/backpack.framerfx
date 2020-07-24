import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { indentTitle } from "./lib/indentTitle"

// @ts-ignore
import BpkSlider from "backpack-transpiled/bpk-component-slider"

export function Slider(props) {
    const {
        large,
        _isValue,
        _value1,
        _value2,
        min,
        max,
        step,
        minDistance,
        onChange,
    } = props

    const value = _isValue ? [_value1] : [_value1, _value2]

    return (
        <BpkSlider
            width="100%"
            large={large}
            min={min}
            max={max}
            value={value}
            step={step}
            minDistance={minDistance}
            onChange={onChange}
        />
    )
}

Slider.defaultProps = {
    height: 30,
    width: 240,
    large: false,
    _isValue: true,
    // onChange: (value) => console.log("Actual value: " + value)
}

addPropertyControls(Slider, {
    large: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    _isValue: {
        title: "Type",
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Value",
        disabledTitle: "Range",
    },
    minDistance: {
        title: indentTitle("Gap"),
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        displayStepper: true,
        hidden: ({ _isValue }) => _isValue,
    },
    _value1: {
        title: "Value",
        type: ControlType.Number,
        defaultValue: 0,
    },
    _value2: {
        title: "Value 2",
        type: ControlType.Number,
        defaultValue: 100,
        hidden: ({ _isValue }) => _isValue,
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
    step: {
        title: "Step",
        type: ControlType.Number,
        defaultValue: 1,
        min: 1,
        displayStepper: true,
    },
})
