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
import BpkBannerAlert, {
    ALERT_TYPES,
    withBannerAlertState,
    BpkBannerAlertDismissable,
    BpkBannerAlertExpandable,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-banner-alert"

const BannerAlertDefaultState = withBannerAlertState(BpkBannerAlert)
const BannerAlertDismissableState = withBannerAlertState(
    BpkBannerAlertDismissable
)
const BannerAlertExpandableState = withBannerAlertState(
    BpkBannerAlertExpandable
)

// interface Props {
//     message?: string
//     type?: "primary" | "success" | "warn" | "error" | "neutral" | "event"
// }

const defaultProps = {
    message: "Alert Message",
    _description: "Description",
    _ui: "default",
    type: ALERT_TYPES.PRIMARY,
    _shouldHide: false,
}

export function BannerAlert(props) {
    const { _shouldHide, _ui, _description, ...rest } = props

    const hideAfter =
        RenderTarget.current() === RenderTarget.canvas || !_shouldHide
            ? null
            : props.hideAfter

    switch (_ui) {
        case "dismissable":
            return (
                <BannerAlertDismissableState
                    {...rest}
                    hideAfter={hideAfter}
                    dismissButtonLabel="Dismiss"
                />
            )
        case "expandable":
            return (
                <BannerAlertExpandableState
                    {...rest}
                    toggleButtonLabel="View more"
                >
                    {_description}
                </BannerAlertExpandableState>
            )
        default:
            return <BannerAlertDefaultState {...rest} hideAfter={hideAfter} />
    }
}

BannerAlert.defaultProps = defaultProps

addPropertyControls(BannerAlert, {
    _ui: {
        type: ControlType.Enum,
        title: "Type",
        options: ["default", "dismissable", "expandable"],
        optionTitles: ["Default", "Dismissable", "Expandable"],
    },
    message: {
        type: ControlType.String,
        title: "Message",
        defaultValue: "Alert Message",
        placeholder: "None",
    },
    _description: {
        type: ControlType.String,
        title: "Description",
        defaultValue: "Description",
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props._ui !== "expandable"
        },
    },
    type: {
        type: ControlType.Enum,
        title: "Style",
        options: [
            ALERT_TYPES.PRIMARY,
            ALERT_TYPES.SUCCESS,
            ALERT_TYPES.WARN,
            ALERT_TYPES.ERROR,
            ALERT_TYPES.NEUTRAL,
            ALERT_TYPES.EVENT,
        ],
    },
    _shouldHide: {
        type: ControlType.Boolean,
        title: "Timeout",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
        hidden(props) {
            return props._ui === "expandable"
        },
    },
    hideAfter: {
        type: ControlType.Number,
        title: "Hide After",
        defaultValue: 5,
        min: 0,
        max: 60,
        hidden(props) {
            return !props._shouldHide || props._ui === "expandable"
        },
    },
})

BannerAlert.displayName = "Banner Alert"
