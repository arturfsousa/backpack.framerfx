import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { logo_horizontal } from "./logos/logo_horizontal"
import { logo_symbol } from "./logos/logo_symbol"
import { logo_vertical } from "./logos/logo_vertical"
import { logo_wordmarque } from "./logos/logo_wordmarque"
import { colors } from "./canvas"

const logos = {
    Horizontal: logo_horizontal,
    Symbol: logo_symbol,
    Vertical: logo_vertical,
    Wordmarque: logo_wordmarque,
}

export function Logo(props) {
    const NamedLogo = logos[props.logo]
    return <NamedLogo {...props} />
}

Logo.defaultProps = {
    fill: colors["Sky Blue"],
    logo: "Horizontal",
}

addPropertyControls(Logo, {
    fill: {
        type: ControlType.Color,
        title: "Fill",
        defaultValue: colors["Sky Blue"],
    },
    logo: {
        type: ControlType.Enum,
        options: ["Horizontal", "Vertical", "Symbol", "Wordmarque"],
    },
})

Logo.displayName = "Skyscanner Logo"
