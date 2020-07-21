import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { colors } from "./canvas"

// @ts-ignore
import { withDefaultProps } from "backpack-transpiled/bpk-react-utils"
// @ts-ignore
import BpkText from "backpack-transpiled/bpk-component-text"

interface Props {
    height: number
    _color?: "Text Primary" | "Text Secondary" | "Sky White"
    bold?: boolean
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
    height: 20,
    text: "Enter some text",
    textStyle: "base",
    tagName: "span",
    bold: false,
    _color: "Text Primary",
}

export function Text(props: Props) {
    const { text, textStyle, bold } = props

    const color = colors[props._color]

    const Component = withDefaultProps(BpkText, {
        textStyle,
        bold,
    })

    return (
        <div style={{ color: color }}>
            <Component>{text}</Component>
        </div>
    )
}

Text.defaultProps = defaultProps

addPropertyControls(Text, {
    text: {
        type: ControlType.String,
        title: "Text",
        placeholder: "Enter some text",
        displayTextArea: true,
    },
    textStyle: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: "base",
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
    _color: {
        type: ControlType.Enum,
        title: "Style",
        defaultValue: "Text Primary",
        options: ["Text Primary", "Text Secondary", "Sky White"],
        optionTitles: ["Primary", "Secondary", "White"],
    },
    bold: {
        type: ControlType.Boolean,
        title: "Weight",
        defaultValue: false,
        enabledTitle: "Bold",
        disabledTitle: "Normal",
    },
    // tagName: {
    //     type: ControlType.Enum,
    //     title: "Text Style",
    //     options: ["span", "p", "text", "h1", "h2", "h3", "h4", "h5", "h6"],
    // },
})
