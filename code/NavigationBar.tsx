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
import { Frame, addPropertyControls, ControlType } from "framer"

import { colors } from "./canvas"

// @ts-ignore
import BpkThemeProvider from "backpack-transpiled/bpk-theming"

import BpkNavigationBar, {
    BpkNavigationBarIconButton,
    BpkNavigationBarButtonLink,
    themeAttributes as navThemeAttributes,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-navigation-bar"

// @ts-ignore
import * as Icons from "backpack-transpiled/bpk-component-icon/all"
// @ts-ignore
import { withRtlSupport } from "backpack-transpiled/bpk-component-icon"
import { indentTitle } from "./lib/indentTitle"

const iconNames = Object.keys(Icons.sm)

export function NavigationBar(props) {
    const {
        title,
        // Colors
        navigationBarBackgroundColor,
        navigationBarTitleColor,
        navigationBarButtonLinkColor,
        navigationBarButtonLinkHoverColor,
        // Buttons
        _leadingButtonType,
        _trailingButtonType,
        _leadingLink,
        _trailingLink,
        _leadingIcon,
        _trailingIcon,
        // Events
        onClickLeft,
        onClickRight,
        ...rest
    } = props

    const theme = {
        navigationBarBackgroundColor: navigationBarBackgroundColor,
        navigationBarTitleColor: navigationBarTitleColor,
        navigationBarButtonLinkColor: navigationBarButtonLinkColor,
        navigationBarButtonLinkActiveColor: navigationBarButtonLinkColor,
        navigationBarButtonLinkHoverColor: navigationBarButtonLinkHoverColor,
        navigationBarButtonLinkVisitedColor: navigationBarButtonLinkColor,
        navigationBarIconButtonColor: navigationBarButtonLinkColor,
        navigationBarIconButtonActiveColor: navigationBarButtonLinkColor,
        navigationBarIconButtonHoverColor: navigationBarButtonLinkHoverColor,
    }

    const getButton = (type, action, icon, event) => {
        switch (type) {
            case "link":
                return (
                    <BpkNavigationBarButtonLink onClick={event}>
                        {action}
                    </BpkNavigationBarButtonLink>
                )
            case "icon":
                const Icon = withRtlSupport(Icons.sm[icon])
                return (
                    <BpkNavigationBarIconButton
                        onClick={event}
                        icon={Icon}
                        label="action"
                    />
                )
            default:
                return null
        }
    }

    const leadingButton = getButton(
        _leadingButtonType,
        _leadingLink,
        _leadingIcon,
        onClickLeft
    )

    const trailingButton = getButton(
        _trailingButtonType,
        _trailingLink,
        _trailingIcon,
        onClickRight
    )

    return (
        <BpkThemeProvider
            theme={theme}
            themeAttributes={[...navThemeAttributes]}
        >
            <BpkNavigationBar
                {...rest}
                title={title}
                leadingButton={leadingButton}
                trailingButton={trailingButton}
            />
        </BpkThemeProvider>
    )
}

NavigationBar.defaultProps = {
    height: 48,
    width: 480,
    title: "Skyscanner",
    navigationBarBackgroundColor: colors["Sky Blue"],
    navigationBarTitleColor: colors["Sky White"],
    navigationBarButtonLinkColor: colors["Sky White"],
    navigationBarButtonLinkHoverColor: colors["Sky White"],
    _leadingButtonType: "icon",
    _trailingButtonType: "icon",
    _leadingLink: "Cancel",
    _trailingLink: "Save",
    _leadingIcon: "long-arrow-left",
    _trailingIcon: "close",
}

addPropertyControls(NavigationBar, {
    title: {
        title: "Title",
        type: ControlType.String,
        defaultValue: "Skyscanner",
        placeholder: "None",
    },
    // Buttons
    _leadingButtonType: {
        title: "Left",
        type: ControlType.Enum,
        options: ["none", "link", "icon"],
        optionTitles: ["None", "Link", "Icon"],
        displaySegmentedControl: true,
    },
    _leadingLink: {
        type: ControlType.String,
        title: indentTitle("Action"),
        defaultValue: "Cancel",
        placeholder: "None",
        hidden: ({ _leadingButtonType }) => _leadingButtonType !== "link",
    },
    _leadingIcon: {
        type: ControlType.Enum,
        title: indentTitle("Icon"),
        defaultValue: "long-arrow-left",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.sm[key]),
        hidden: ({ _leadingButtonType }) => _leadingButtonType !== "icon",
    },
    _trailingButtonType: {
        title: "Right",
        type: ControlType.Enum,
        options: ["none", "link", "icon"],
        optionTitles: ["None", "Link", "Icon"],
        displaySegmentedControl: true,
    },
    _trailingLink: {
        type: ControlType.String,
        title: indentTitle("Action"),
        defaultValue: "Save",
        placeholder: "None",
        hidden: ({ _trailingButtonType }) => _trailingButtonType !== "link",
    },
    _trailingIcon: {
        type: ControlType.Enum,
        title: indentTitle("Icon"),
        defaultValue: "close",
        options: iconNames,
        optionTitles: iconNames.map((key) => Icons.sm[key]),
        hidden: ({ _trailingButtonType }) => _trailingButtonType !== "icon",
    },
    // Theming
    navigationBarBackgroundColor: {
        title: "Background",
        type: ControlType.Color,
        defaultValue: NavigationBar.defaultProps.navigationBarBackgroundColor,
    },
    navigationBarTitleColor: {
        title: "Title",
        type: ControlType.Color,
        defaultValue: NavigationBar.defaultProps.navigationBarTitleColor,
    },
    navigationBarButtonLinkColor: {
        title: "Buttons",
        type: ControlType.Color,
        defaultValue: NavigationBar.defaultProps.navigationBarButtonLinkColor,
    },
    navigationBarButtonLinkHoverColor: {
        title: "Hover",
        type: ControlType.Color,
        defaultValue:
            NavigationBar.defaultProps.navigationBarButtonLinkHoverColor,
    },
    // Events
    onClickLeft: {
        type: ControlType.EventHandler,
    },
    onClickRight: {
        type: ControlType.EventHandler,
    },
})

NavigationBar.displayName = "Navigation Bar"
