import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import BpkButton from 'backpack-transpiled/bpk-component-button';

interface Props {
  label?: string;
  large?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'featured' | 'destructive' | 'outline';
  link?: boolean;
  href?: string;
  blank?: boolean;
}

const defaultProps: Props = {
  label: 'Button',
  large: false,
  disabled: false,
  variant: 'primary',
  link: false,
  href: null,
  blank: false,
};

export function Button(props) {
  const { label, variant, ...rest } = props;
  let bpkProps = { ...rest };
  if (variant !== 'primary') {
    bpkProps[variant] = 'true';
  }

  return <BpkButton {...bpkProps}>{label}</BpkButton>;
}

Button.defaultProps = defaultProps;

addPropertyControls(Button, {
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  large: {
    type: ControlType.Boolean,
    title: 'Large',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['primary', 'secondary', 'featured', 'destructive', 'outline'],
  },
  link: {
    type: ControlType.Boolean,
    title: 'Link',
  },
  href: {
    type: ControlType.String,
    title: 'Link href',
  },
  blank: {
    type: ControlType.Boolean,
    title: 'Link target blank',
  },
});
