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
