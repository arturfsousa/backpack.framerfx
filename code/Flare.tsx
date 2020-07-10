import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// @ts-ignore
import { BpkContentBubble } from 'backpack-transpiled/bpk-component-flare';

interface Props {
  content?: string;
}

const defaultProps: Props = {
  content: 'Hello World!',
};

export function Flare(props: Props) {
  const { ...rest } = props;

  return <BpkContentBubble {...rest} />;
}

Flare.defaultProps = defaultProps;

addPropertyControls(Flare, {
  content: {
    type: ControlType.String,
    title: 'Text',
  },
});
