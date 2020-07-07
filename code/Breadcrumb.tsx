import * as React from 'react';
import BpkBreadcrumb, {
  BpkBreadcrumbItem,
} from 'backpack-transpiled/bpk-component-breadcrumb';

export function Breadcrumb() {
  return (
    <BpkBreadcrumb label="breadcrumb">
      <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
      <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
      <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
    </BpkBreadcrumb>
  );
}
