import React, { Dispatch, useEffect, useState } from 'react';
import { Stage} from '@pixi/react';
import Desk from '../../types/Desk';
import { Graphics } from '@inlet/react-pixi';
import MyPenguin from '../penguins/MyPenguin';
import User from '../../types/User';
import Penguin from '../penguins/Penguin';
import PenguinsContainer from '../penguins/PenguinsContainer';

interface Props{
    desks: Desk[],
    user: User,
    setUser: Dispatch<User>
  }

const Map = ({desks, user, setUser}:Props) => {
    const penguinUsers: User[] = [
        {x: 100, y: 100, nickname: "Pinguin1", id:"4"},
        {x: 600, y: 400, nickname: "Pinguin2", id:"7"},
    ]

    return (
    <Stage width={window.innerWidth*0.7} height={window.innerHeight} options={{ backgroundColor: "e0ebeb", antialias: true }}>
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
        <PenguinsContainer user={user} penguins={penguinUsers} setUser={setUser}/>
    </Stage>
    )
}

export default Map