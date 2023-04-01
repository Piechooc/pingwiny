import React from 'react';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import Desk from '../../types/Desk';
import { Graphics } from '@inlet/react-pixi';

interface Props{
    desks: Desk[];
  }

const Map = ({desks}:Props) => {
  return (
    <Stage width={1100} height={750}
        options={{ backgroundColor: "e0ebeb", antialias: true }}>
          {desks.map(desk=>
            <Graphics
            draw={g => {
              g.clear();
              g.beginFill("392C20");
              g.drawRect(desk.x,desk.y, 150, 75);
              g.endFill();
            }}
            />
            )}
      
    </Stage>
  )
}

export default Map