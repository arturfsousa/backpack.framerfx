import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import BpkCard from 'backpack-transpiled/bpk-component-card';

interface Props {
  children: NonNullable<React.ReactNode>;
  padded?: boolean;
}

export function Card(props: Props) {
  const { children, ...rest } = props;

  return <BpkCard {...rest}>{children}</BpkCard>;
}

Card.defaultProps = {
  padded: true,
};

addPropertyControls(Card, {
  children: {
    type: ControlType.Array,
    title: 'Content',
    propertyControl: {
      type: ControlType.ComponentInstance,
      title: 'Text',
    },
  },
  padded: {
    type: ControlType.Boolean,
    title: 'Padded',
  },
});
