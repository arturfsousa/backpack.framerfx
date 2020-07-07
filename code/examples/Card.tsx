import * as React from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import { Image } from '../Image';

export function CardExample() {
  return (
    <Card>
      <Text textStyle="xl" tagName="h1" text="Card Title" />
      <Text
        text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus."
      />
      <Image
        altText="Andalsnes Norway"
        width={816}
        height={544}
        src="https://content.skyscnr.com/6c8f0e633bde70798a9d6f0a26cb6016/andalsnes-norway.jpg"
      />
    </Card>
  );
}
