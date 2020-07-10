import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';

// @ts-ignore
import BpkChip, { CHIP_TYPES } from 'backpack-transpiled/bpk-component-chip';

interface Props {
  text?: string;
  type?:
    | 'neutral'
    | 'primary';
}

const defaultProps: Props = {
  text: 'Chip',
  type: CHIP_TYPES.neutral,
};

export function Chip(props: Props) {
  const { text, ...rest } = props;

  return <BpkChip {...rest}>{text}</BpkChip>;
}

Chip.defaultProps = defaultProps;

addPropertyControls(Chip, {
  text: {
    type: ControlType.String,
    title: 'Text',
  },
  type: {
    type: ControlType.Enum,
    title: 'Type',
    options: [
      CHIP_TYPES.neutral,
      CHIP_TYPES.primary,
    ],
  },
});
