import * as React from 'react';
import {
  BpkAccordion,
  BpkAccordionItem,
} from 'backpack-transpiled/bpk-component-accordion';

export function Accordion() {
  return (
    <BpkAccordion>
      <BpkAccordionItem id="stops" title="Stops">
        My stops content.
      </BpkAccordionItem>
      <BpkAccordionItem
        id="departure-times"
        title="Departure times"
        initiallyExpanded
      >
        My departure times content.
      </BpkAccordionItem>
      <BpkAccordionItem id="journey-duration" title="Journey duration">
        My journey duration content.
      </BpkAccordionItem>
    </BpkAccordion>
  );
}
