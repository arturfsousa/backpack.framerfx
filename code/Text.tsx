import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { withDefaultProps } from "backpack-transpiled/bpk-react-utils"
// @ts-ignore
import BpkText from "backpack-transpiled/bpk-component-text"

interface Props {
    text?: string
    textStyle?:
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "xxl"
        | "xxxl"
        | "xxxxl"
        | "xxxxxl"
    tagName?: "span" | "p" | "text" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const defaultProps: Props = {
    text: "Enter some text..",
    textStyle: "base",
    tagName: "p",
}

export function Text(props: Props) {
    const { text, textStyle, tagName } = props

    const Component = withDefaultProps(BpkText, {
        textStyle,
        tagName,
    })

    return <Component>{text}</Component>
}

Text.defaultProps = defaultProps

addPropertyControls(Text, {
    text: {
        type: ControlType.String,
        title: "Text",
    },
    textStyle: {
        type: ControlType.Enum,
        title: "Text Style",
        options: [
            "xs",
            "sm",
            "base",
            "lg",
            "xl",
            "xxl",
            "xxxl",
            "xxxxl",
            "xxxxxl",
        ],
    },
    tagName: {
        type: ControlType.Enum,
        title: "Text Style",
        options: ["span", "p", "text", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
})
