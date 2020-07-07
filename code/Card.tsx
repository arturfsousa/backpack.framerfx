import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import BpkCard from 'backpack-transpiled/bpk-component-card';

export function Card(props) {
  const { children, ...rest } = props;

  return (
    <BpkCard {...rest} padded={true}>
      {children}
    </BpkCard>
  );
}

addPropertyControls(Card, {
  children: {
    type: ControlType.Array,
    title: 'Content',
    propertyControl: {
      type: ControlType.ComponentInstance,
      title: 'Text',
    },
  },
});
