import * as React from "react"
import { addPropertyControls, ControlType, Stack } from "framer"

import { NotConnected } from "./NotConnected"

import {
    BpkAccordion,
    BpkAccordionItem,
    withSingleItemAccordionState,
    withAccordionItemState,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-accordion"

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion)
const StatefulAccordionItem = withAccordionItemState(BpkAccordionItem)

const defaultProps = {
    isSingleExpander: true,
}

export function Accordion(props) {
    const { isSingleExpander, sections, children } = props

    if (React.Children.count(children) === 0) {
        return <NotConnected prompt="Connect to a stack" />
    } else {
        const items = children[0].props.children
        const hasChildren = React.Children.count(items) > 0

        if (hasChildren) {
            const singleItems = items.map((child) => {
                const { name = "Frame" } = child.props

                const singleItem = (
                    <BpkAccordionItem id={name} title={name}>
                        {React.cloneElement(child, {
                            position: "relative",
                            width: "100%",
                        })}
                    </BpkAccordionItem>
                )

                return singleItem
            })

            const statefulItems = items.map((child) => {
                const { name = "Frame" } = child.props

                const statefulItem = (
                    <StatefulAccordionItem id={name} title={name}>
                        {React.cloneElement(child, {
                            position: "relative",
                            width: "100%",
                        })}
                    </StatefulAccordionItem>
                )
                return statefulItem
            })

            const accordion = isSingleExpander ? (
                <SingleItemAccordion>{singleItems}</SingleItemAccordion>
            ) : (
                <BpkAccordion>{statefulItems}</BpkAccordion>
            )

            return accordion
        } else {
            return <NotConnected prompt="Connect to a stack" />
        }
    }
}

Accordion.defaultProps = defaultProps

addPropertyControls(Accordion, {
    isSingleExpander: {
        type: ControlType.Boolean,
        title: "Expand",
        defaultValue: true,
        enabledTitle: "Single",
        disabledTitle: "Multiple",
    },
})
