import React, { useEffect, useState } from 'react';
import { Stage} from '@pixi/react';
import Desk from '../../types/Desk';
import { Graphics } from '@inlet/react-pixi';
import MyPenguin from '../penguins/MyPenguin';
import User from '../../types/User';
import Penguin from '../penguins/Penguin';

interface Props{
    desks: Desk[],
    user: User
  }

const Map = ({desks, user}:Props) => {
    const penguinUsers: User[] = [
        {x: 100, y: 100, nickname: "Pinguin1", id:"4", status: "m"},
        {x: 600, y: 400, nickname: "Pinguin2", id:"7", status: "t"},
    ]

    return (
    <Stage width={1100} height={750} options={{ backgroundColor: "e0ebeb", antialias: true }}>
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
        {penguinUsers.map((penguinUser, index)=>
            <Penguin
            key={index}
            user={penguinUser}
        />
        )}
        <MyPenguin user={user}/>
    </Stage>
    )
}

export default Map