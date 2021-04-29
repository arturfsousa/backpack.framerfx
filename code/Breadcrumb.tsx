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
import { addPropertyControls, ControlType } from "framer"

import BpkBreadcrumb, {
    BpkBreadcrumbItem,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-breadcrumb"

interface Props {
    // Sizing properties
    height: number
    width: number

    // Item properties
    items: string[]

    // Event properties
    onLink1Click: () => void
    onLink2Click: () => void
    onLink3Click: () => void
    onLink4Click: () => void
    onLink5Click: () => void
    onLink6Click: () => void
    onLink7Click: () => void
    onLink8Click: () => void
    onLink9Click: () => void
    onLink10Click: () => void
}

export function Breadcrumb(props: Props) {
    const {
        // Item properties
        items,

        // Event properties
        onLink1Click,
        onLink2Click,
        onLink3Click,
        onLink4Click,
        onLink5Click,
        onLink6Click,
        onLink7Click,
        onLink8Click,
        onLink9Click,
        onLink10Click,
    } = props

    // Object with item data
    const allItems = [
        { text: items[0], event: onLink1Click },
        { text: items[1], event: onLink2Click },
        { text: items[2], event: onLink3Click },
        { text: items[3], event: onLink4Click },
        { text: items[4], event: onLink5Click },
        { text: items[5], event: onLink6Click },
        { text: items[6], event: onLink7Click },
        { text: items[7], event: onLink8Click },
        { text: items[8], event: onLink9Click },
        { text: items[9], event: onLink10Click },
    ].slice(0, items.length)

    return (
        <BpkBreadcrumb label="breadcrumb">
            {allItems.map((item, index) => {
                const isLast = index === allItems.length - 1
                return (
                    <BpkBreadcrumbItem
                        key={index}
                        active={isLast}
                        href="#"
                        onClick={() => item.event && !isLast && item.event()}
                    >
                        {item.text}
                    </BpkBreadcrumbItem>
                )
            })}
        </BpkBreadcrumb>
    )
}

Breadcrumb.defaultProps = {
    height: 24,
    width: 360,
    items: ["Page 1", "Page 2", "Page 3"],
}

addPropertyControls(Breadcrumb, {
    items: {
        type: ControlType.Array,
        title: "Items",
        maxCount: 10,
        defaultValue: Breadcrumb.defaultProps.items,
        control: {
            type: ControlType.String,
            defaultValue: "Page Title",
        },
    },

    // Event Property Controls
    onLink1Click: {
        title: "Link 1 Click",
        type: ControlType.EventHandler,
    },
    onLink2Click: {
        title: "Link 2 Click",
        type: ControlType.EventHandler,
    },
    onLink3Click: {
        title: "Link 3 Click",
        type: ControlType.EventHandler,
    },
    onLink4Click: {
        title: "Link 4 Click",
        type: ControlType.EventHandler,
    },
    onLink5Click: {
        title: "Link 5 Click",
        type: ControlType.EventHandler,
    },
    onLink6Click: {
        title: "Link 6 Click",
        type: ControlType.EventHandler,
    },
    onLink7Click: {
        title: "Link 7 Click",
        type: ControlType.EventHandler,
    },
    onLink8Click: {
        title: "Link 8 Click",
        type: ControlType.EventHandler,
    },
    onLink9Click: {
        title: "Link 9 Click",
        type: ControlType.EventHandler,
    },
    // onLink10Click: {
    //     title: "Link 10 Click",
    //     type: ControlType.EventHandler,
    // },
})
