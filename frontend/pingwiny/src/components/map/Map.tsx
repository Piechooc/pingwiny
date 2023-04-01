import React, { useEffect, useState } from 'react';
import { Stage} from '@pixi/react';
import Desk from '../../types/Desk';
import { Graphics } from '@inlet/react-pixi';
import MyPenguin from '../penguins/MyPenguin';
interface Props{
    desks: Desk[];
  }

const Map = ({desks}:Props) => {

  return (
    <Stage width={1100} height={750}
        options={{ backgroundColor: "e0ebeb", antialias: true }}>
          {desks.map((desk, index)=>
            <Graphics
            key={index}
            draw={g => {
              g.clear();
              g.beginFill(0x8c6393);
              g.drawRect(desk.x,desk.y, 150, 75);
              g.endFill();
            }}
            />
            )}
        <MyPenguin/>
    </Stage>
  )
}

export default Map