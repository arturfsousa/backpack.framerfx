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
import { addPropertyControls, ControlType, RenderTarget } from "framer"

import { NotConnected } from "./NotConnected"

import BpkBreakpoint, {
    BREAKPOINTS,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-breakpoint"

// If base = 16 px then 1 rem = 16 px
// BREAKPOINTS:
// MOBILE: "(max-width: 32.25rem = 516px)"
// TABLET: "(max-width: 50.25rem = 804px)"
// TABLET_ONLY: "(min-width: 32.3125rem = 517px) and (max-width: 50.25rem = 804px)"
// ABOVE_MOBILE: "(min-width: 32.3125rem = 517px)"
// ABOVE_TABLET: "(min-width: 50.3125rem = 805px)"

export function Breakpoint(props) {
    const { width, mobile, tablet, aboveTablet } = props

    if (mobile.length === 0 && tablet.length === 0 && aboveTablet.length === 0)
        return <NotConnected />

    const _mobile =
        mobile.length > 0 ? mobile : tablet.length > 0 ? tablet : aboveTablet

    const _tablet =
        tablet.length > 0 ? tablet : mobile.length > 0 ? mobile : aboveTablet

    const _aboveTablet =
        aboveTablet.length > 0
            ? aboveTablet
            : tablet.length > 0
            ? tablet
            : mobile

    if (RenderTarget.current() === RenderTarget.canvas) {
        if (width <= 516) {
            return getResponsiveComponent(_mobile)
        } else if (width <= 804) {
            return getResponsiveComponent(_tablet)
        } else {
            return getResponsiveComponent(_aboveTablet)
        }
    } else {
        return (
            <>
                <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
                    {getResponsiveComponent(_mobile)}
                </BpkBreakpoint>
                <BpkBreakpoint query={BREAKPOINTS.TABLET_ONLY}>
                    {getResponsiveComponent(_tablet)}
                </BpkBreakpoint>
                <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
                    {getResponsiveComponent(_aboveTablet)}
                </BpkBreakpoint>
            </>
        )
    }
}

function getResponsiveComponent(component) {
    return React.Children.map(component, (child) =>
        React.cloneElement(child, {
            width: "100%",
            height: "100%",
        })
    )
}

Breakpoint.defaultProps = {
    height: 812,
    width: 375,
}

addPropertyControls(Breakpoint, {
    mobile: {
        title: "Mobile",
        type: ControlType.ComponentInstance,
    },
    tablet: {
        title: "Tablet",
        type: ControlType.ComponentInstance,
    },
    aboveTablet: {
        title: "Above Tablet",
        type: ControlType.ComponentInstance,
    },
})
