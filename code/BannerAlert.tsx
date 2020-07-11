import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import BpkBannerAlert, {
    ALERT_TYPES,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-banner-alert"

interface Props {
    message?: string
    type?: "primary" | "success" | "warn" | "error" | "neutral" | "event"
}

const defaultProps: Props = {
    message: "Banner message",
    type: ALERT_TYPES.PRIMARY,
}

export function BannerAlert(props: Props) {
    return <BpkBannerAlert {...props} />
}

BannerAlert.defaultProps = defaultProps

addPropertyControls(BannerAlert, {
    message: {
        type: ControlType.String,
        title: "Message",
    },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: [
            ALERT_TYPES.PRIMARY,
            ALERT_TYPES.SUCCESS,
            ALERT_TYPES.WARN,
            ALERT_TYPES.ERROR,
            ALERT_TYPES.NEUTRAL,
            ALERT_TYPES.EVENT,
        ],
    },
})
