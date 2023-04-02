import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
import StatusButton from "./components/status/Status"
import Cloud from './types/Cloud';

import ArchiveObject from "./components/archive/ChatArchiveList";
import ChatArchive from "./types/ChatArchive";
import Chat from "./components/chat/Chat";
interface Props{
  desks: Desk[],
  clouds: Cloud[],
}

export const App = ({desks, clouds}:Props) =>
{
  const [user, setUser] = useState<User>();


  const chatArchiveList: ChatArchive[] = [
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test", tags: "smth"},
        {name: "test2", tags: "smth2"}
  ]
  let show_archive_list = true

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :
        <div style={{display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{justifyContent: 'flex-start'}}>
            {!show_archive_list ?
              <Chat userId={user.id} chatId={user.id}/> :
              <ArchiveObject chatList={chatArchiveList}/>
            }
          </div>
          <div style={{justifyContent: 'flex-end'}}>
              <Map desks={desks} user={user} setUser={setUser} clouds={clouds}/>
          </div>
        </div>}
      {user ? (<div style={{display:"flex"}}>
        <div>
          <StatusButton status={"Don't Disturb"} user={user}/>
        </div>
        <div>
          <StatusButton status={"Help"} user={user}/>
        </div>
        <div>
          <StatusButton status={"Available"} user={user}/>
        </div>
      </div>):null}
    </>
  );
};

export default App;
