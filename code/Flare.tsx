import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import { BpkContentBubble } from 'backpack-transpiled/bpk-component-flare';

export function Flare(props) {
  const { text, ...rest } = props;

  return <BpkContentBubble {...rest}>{text}</BpkContentBubble>;
}
