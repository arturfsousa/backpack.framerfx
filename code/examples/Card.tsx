import * as React from 'react';
import { Card } from '../Card';
import { Text } from '../Text';

export function CardExample() {
  return (
    <Card>
      <Text textStyle="xl" tagName="h1" text="Card Title" />
      <Text
        text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus."
      />
    </Card>
  );
}
