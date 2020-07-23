import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
// @ts-ignore
import BpkBlockquote from "backpack-transpiled/bpk-component-blockquote"

interface Props {
    text?: string
    extraSpace?: boolean
}

const defaultProps: Props = {
    text:
        "We start by solving problems for our travellers, followed by our partners. Never selfish, we put the company before the team and the team before ourselves.",
    extraSpace: false,
}

export function Blockquote(props: Props) {
    const { text, ...rest } = props

    return <BpkBlockquote {...rest}>{text}</BpkBlockquote>
}

Blockquote.defaultProps = defaultProps

addPropertyControls(Blockquote, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue:
            "We start by solving problems for our travellers, followed by our partners. Never selfish, we put the company before the team and the team before ourselves.",
        placeholder: "Enter a quote",
        displayTextArea: true,
    },
    extraSpace: {
        type: ControlType.Boolean,
        title: "Extra Space",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
