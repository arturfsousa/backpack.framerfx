import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { colors } from "./canvas"
// @ts-ignore
import BpkCard from "backpack-transpiled/bpk-component-card"

interface Props {
    children: NonNullable<React.ReactNode>
    padded?: boolean
}

export function Card(props) {
    const {
        usesTextContent,
        usesDefaultStyle,
        color,
        backgroundColor,
        text,
        children,
        ...rest
    } = props

    const relativeChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, {
            position: "relative",
            style: { width: "100%" },
        })
    )
    const style = usesDefaultStyle
        ? null
        : { color: color, backgroundColor: backgroundColor }
    if (usesTextContent) {
        return (
            <BpkCard {...rest} style={style}>
                {text}
            </BpkCard>
        )
    } else {
        return (
            <BpkCard {...rest} style={style}>
                {relativeChildren}
            </BpkCard>
        )
    }
}

Card.defaultProps = {
    width: 360,
    height: 180,
    usesCustomStyle: false,
    text: "Skyscanner",
    padded: true,
}

addPropertyControls(Card, {
    padded: {
        type: ControlType.Boolean,
        title: "Padded",
    },
    usesTextContent: {
        type: ControlType.Boolean,
        title: "Content",
        defaultValue: true,
        enabledTitle: "Text",
        disabledTitle: "Component",
    },
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Skyscanner",
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props.usesTextContent === false
        },
    },
    usesDefaultStyle: {
        type: ControlType.Boolean,
        title: "Style",
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Custom",
    },
    color: {
        title: "Colour",
        type: ControlType.Color,
        defaultValue: colors["Sky White"],
        hidden(props) {
            return props.usesDefaultStyle
        },
    },
    backgroundColor: {
        title: "Background",
        type: ControlType.Color,
        defaultValue: colors["Sky Blue"],
        hidden(props) {
            return props.usesDefaultStyle
        },
    },
    onClick: {
        type: ControlType.EventHandler,
    },
})
