import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkCloseButton from "backpack-transpiled/bpk-component-close-button"

export function CloseButton(props) {
    const { onClick, ...rest } = props

    return <BpkCloseButton label="Close" onClick={onClick} {...rest} />
}

CloseButton.defaultProps = {
    height: 24,
    width: 18,
    onClick: () => null,
}

addPropertyControls(CloseButton, {
    onClick: {
        type: ControlType.EventHandler,
    },
})

CloseButton.displayName = "Close Button"
