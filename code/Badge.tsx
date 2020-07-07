import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import BpkBadge, { BADGE_TYPES } from 'backpack-transpiled/bpk-component-badge';

interface Props {
  text?: string;
  type?:
    | 'warning'
    | 'success'
    | 'destructive'
    | 'light'
    | 'inverse'
    | 'outline';
  centered?: boolean;
  docked?: 'left' | 'right';
}

const defaultProps: Props = {
  text: 'Badge',
  type: 'warning',
  centered: false,
  docked: null,
};

export function Badge(props) {
  const { text, ...rest } = props;

  return <BpkBadge {...rest}>{text}</BpkBadge>;
}

Badge.defaultProps = defaultProps;

addPropertyControls(Badge, {
  text: {
    type: ControlType.String,
    title: 'Text',
  },
  type: {
    type: ControlType.Enum,
    title: 'Extra Space',
    options: [
      'warning',
      'success',
      'destructive',
      'light',
      'inverse',
      'outline',
    ],
  },
  centered: {
    type: ControlType.Boolean,
    title: 'Centered',
  },
  docked: {
    type: ControlType.Enum,
    title: 'Docked',
    options: [null, 'left', 'right'],
    optionTitles: ['None', 'Left', 'Right'],
  },
});
