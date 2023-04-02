import React, {Dispatch, useEffect, useState} from 'react';
import {Stage} from '@pixi/react';
import Desk from '../../types/Desk';
import {Graphics} from '@inlet/react-pixi';
import MyPenguin from '../penguins/MyPenguin';
import User from '../../types/User';
import Penguin from '../penguins/Penguin';
import Cloud from "../../types/Cloud";
import { Text } from '@pixi/react';
import PenguinsContainer from '../penguins/PenguinsContainer';

interface Props{
    desks: Desk[],
    user: User,
    setUser: Dispatch<User>,
    clouds: Cloud[]
  }

const Map = ({desks, user, setUser, clouds}:Props) => {
    const [penguinUsers, setPenguinUsers] = useState<User[]>([]);

    useEffect(() => {
        const penguinsUpdateInterval = setInterval(() => {
            fetch('http://127.0.0.1:5050/getmapstate/' + user["id"], {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const otherPenguings = data["users"].filter((onePenguing: User) => onePenguing.id != user.id);
        
                setPenguinUsers(otherPenguings);
            })
            .catch(error => {
                console.error(error);
                alert('Error: ' + error)
            });
        }, 200);
        return () => {
            clearInterval(penguinsUpdateInterval);
        };
    }, []);

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
        {clouds.map((cloud, index) =>
                <Graphics
                    key={index}
                    draw={g => {
                        g.clear();
                        g.beginFill(0x000000);
                        g.drawEllipse(cloud.x + 90, cloud.y - 70, 105, 75);
                        g.endFill();
                        g.beginFill(0xc7c4bf);
                        g.drawEllipse(cloud.x + 90, cloud.y - 70, 100, 70);
                        g.endFill();
                    }}
                />
            )}
            {clouds.map((cloud, index) =>
                <Text
                  text={cloud.text}
                  x={cloud.x + 60}
                  y={cloud.y - 70}
                  scale={{ x: 0.8, y: 0.8 }}
                />
            )}
            {penguinUsers.map((penguinUser, index) =>
                <Graphics
                    key={index}
                    draw={g => {
                        g.clear();
                        g.beginFill(0x000000);
                        g.drawCircle(penguinUser.x + 40, penguinUser.y + 20, 11);
                        g.endFill();
                        g.beginFill(    penguinUser.status == "available" ? 0x00ff00 : 0xff0000);
                        g.drawCircle(penguinUser.x + 40, penguinUser.y + 20, 10);
                        g.endFill();
                    }}
                />
            )}
        </Stage>
    )
}

export default Map