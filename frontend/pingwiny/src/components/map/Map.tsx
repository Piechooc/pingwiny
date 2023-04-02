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
import ChatArchiveObject from "../archive/ChatArchiveObject";
import ArchiveList from "../../types/ArchiveList";

interface Props{
    desks: Desk[],
    user: User,
    setUser: Dispatch<User>,
    setShowArchiveList: Dispatch<boolean>,
    showArchiveList: boolean,
    setChatArchiveList: Dispatch<ArchiveList[]>,
    clouds: Cloud[]
  }

const Map = ({desks, user, setUser, setShowArchiveList, setChatArchiveList, showArchiveList, clouds}:Props) => {
    const [penguinUsers, setPenguinUsers] = useState<User[]>([]);
    const [showArchiveButton, setShowArchiveButton] = useState(false);

    const handleArchiveButtonClick = () => {

        const chatArchiveList: ArchiveList[] = [
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        {chat_id: "test", tags: ["smth", "smth"]},
        ]
        setChatArchiveList(chatArchiveList);

      showArchiveList ? setShowArchiveList(false) : setShowArchiveList(true)
    };


    // const handleArchiveButtonClick = () => {
    //   fetch('http://127.0.0.1:5050/archive/' + user["id"], {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify({
    //     //   id: user.id,
    //     //   x: x,
    //     //   y: y
    //     // })
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //       const archiveList = data[""]
    //
    //       const otherPenguings = data["users"].filter((onePenguing: User) => onePenguing.id != user.id);
    //       setPenguinUsers(otherPenguings);
    //
    //
    //   })
    //   .catch(error => {
    //       console.error(error);
    //       alert('Error: ' + error)
    //   });
    //
    //
    //   const response = await fetch('http://penguins-agh-rest.azurewebsites.net/createchat/', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       user_id1: selectedPenguin?.id,
    //       user_id2: user.id,
    //       is_private: false
    //     })
    //   })
    //
    //   if (response.ok) {
    //     console.log(response);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert('Error: ' + error)
    // }
    //
    //
    //   showArchiveList ? setShowArchiveList(false) : setShowArchiveList(true)
    // };


    useEffect(() => {
        const penguinsUpdateInterval = setInterval(() => {
            fetch('http://penguins-agh-rest.azurewebsites.net/getmapstate/' + user["id"], {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const otherPenguings = data["users"].filter((onePenguin: User) => onePenguin.id != user.id);
        
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
    
    
    useEffect(() => {
        const archiveProximityCheck = setInterval(() => {
            const dx = user.x - 1100;
            const dy = user.y - 20;
            const distance = Math.sqrt(dx * dx + dy * dy);
            setShowArchiveButton(distance < 100);
            // setShowArchiveList = showArchiveButton;
        }, 200);

        return () => {
            clearInterval(archiveProximityCheck);
        };
    }, [user]);


    return (
    <Stage width={window.innerWidth*0.7} height={window.innerHeight*0.9} options={{ backgroundColor: "e0ebeb", antialias: true }}>
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
                        g.beginFill(    penguinUser.status == "Available" ? 0x00ff00 : penguinUser.status == "Help" ? 0x1AA7EC : 0xff0000);
                        g.drawCircle(penguinUser.x + 40, penguinUser.y + 20, 10);
                        g.endFill();
                    }}
                />
            )}
        <ChatArchiveObject showButton={showArchiveButton} handleButtonClick={handleArchiveButtonClick}/>
        </Stage>
    )
}

export default Map