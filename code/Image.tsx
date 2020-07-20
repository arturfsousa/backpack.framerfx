import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// @ts-ignore
import { borderRadiusSm } from "backpack-transpiled/bpk-tokens/tokens/base.es6"

export function Image(props) {
    const { isURL, isntRounded, url, image, onTap, ...rest } = props

    console.log(borderRadiusSm)

    return (
        <Frame
            {...rest}
            radius={isntRounded ? 0 : borderRadiusSm}
            image={isURL ? url : image}
            onTap={onTap}
        />
    )
}

Image.defaultProps = {
    height: 128,
    width: 240,
    isURL: true,
    url:
        "https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg",
    isntRounded: true,
}

addPropertyControls(Image, {
    isURL: {
        type: ControlType.Boolean,
        title: "Source",
        defaultValue: true,
        enabledTitle: "URL",
        disabledTitle: "File",
    },
    image: {
        type: ControlType.Image,
        hidden(props) {
            return props.isURL === true
        },
    },
    url: {
        title: "URL",
        type: ControlType.String,
        defaultValue:
            "https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg",
        placeholder: "Enter a URL",
        hidden(props) {
            return props.isURL === false
        },
    },
    onTap: {
        type: ControlType.EventHandler,
    },
    isntRounded: {
        type: ControlType.Boolean,
        title: "Corners",
        defaultValue: true,
        enabledTitle: "Default",
        disabledTitle: "Rounded",
    },
})
