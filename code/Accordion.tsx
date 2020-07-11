import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

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
    sections: ["Section One", "Section Two", "Section Three"],
}

export function Accordion(props) {
    const { isSingleExpander, sections } = props

    const content = "Lorem ipsum dolor sit"
    const singleItems = sections.map((section) => {
        const item = (
            <BpkAccordionItem id={section} title={section}>
                {content}
            </BpkAccordionItem>
        )
        return item
    })
    const statefulItems = sections.map((section) => {
        const item = (
            <StatefulAccordionItem id={section} title={section}>
                {content}
            </StatefulAccordionItem>
        )
        return item
    })
    const accordion = isSingleExpander ? (
        <SingleItemAccordion>{singleItems}</SingleItemAccordion>
    ) : (
        <BpkAccordion>{statefulItems}</BpkAccordion>
    )
    return accordion
}

Accordion.defaultProps = defaultProps

addPropertyControls(Accordion, {
    isSingleExpander: {
        type: ControlType.Boolean,
        title: "Expand Behaviour",
        defaultValue: true,
        enabledTitle: "Single",
        disabledTitle: "Multiple",
    },
    sections: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
        maxCount: 5,
    },
})
