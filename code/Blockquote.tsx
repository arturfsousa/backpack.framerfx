import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// @ts-ignore
import BpkBlockquote from 'backpack-transpiled/bpk-component-blockquote';

interface Props {
  text?: string;
  extraSpace?: boolean;
}

const defaultProps: Props = {
  text: 'This is the BpkBlockquote...',
  extraSpace: false,
};

export function Blockquote(props: Props) {
  const { text, ...rest } = props;

  return <BpkBlockquote {...rest}>{text}</BpkBlockquote>;
}

Blockquote.defaultProps = defaultProps;

addPropertyControls(Blockquote, {
  text: {
    type: ControlType.String,
    title: 'Text',
  },
  extraSpace: {
    type: ControlType.Boolean,
    title: 'Extra Space',
  },
});
