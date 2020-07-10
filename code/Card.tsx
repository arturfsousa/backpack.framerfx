import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// @ts-ignore
import BpkCard from 'backpack-transpiled/bpk-component-card';

interface Props {
  children: NonNullable<React.ReactNode>;
  padded?: boolean;
}

export function Card(props) {
  const { children, ...rest } = props;

  const relativeChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { position: "relative" })
  )

  return <BpkCard {...rest}>{relativeChildren}</BpkCard>;
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
