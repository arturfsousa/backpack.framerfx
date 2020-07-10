import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// @ts-ignore
import BpkImage from 'backpack-transpiled/bpk-component-image';

interface Props {
  altText?: string;
  width?: number;
  height?: number;
  src?: string;
}

export function Image(props) {
  const { children, ...rest } = props;
  return <BpkImage {...rest} />;
}

addPropertyControls(Image, {
  altText: {
    type: ControlType.String,
    title: 'Alt Text',
  },
  width: {
    type: ControlType.Number,
    title: 'Width',
  },
  height: {
    type: ControlType.Number,
    title: 'Height',
  },
  src: {
    type: ControlType.String,
    title: 'URL',
  },
});
