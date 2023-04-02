import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import {Dispatch, useMemo} from 'react';

import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
import StatusButton from "./components/status/Status"
import Cloud from './types/Cloud';

import Chat from "./components/chat/Chat";
import ChatType from './types/ChatType';
import ArchiveObject from "./components/archive/ChatArchiveList";
import ArchiveList from "./types/ArchiveList";


interface Props{
  desks: Desk[],
  clouds: Cloud[],
}

export const App = ({desks, clouds}:Props) =>
{
  const [user, setUser] = useState<User>();
  const [showArchiveList, setShowArchiveList] = useState(false);
  const [chatArchiveList, setChatArchiveList] = useState<ArchiveList[]>([]);
  const [chat, setChat] = useState<ChatType>();

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :
          <div style={{display: 'flex', maxHeight:"90vh"}}>
            <div style={{justifyContent: 'flex-start'}}>
              {user ? (!showArchiveList ? (chat ? <Chat user={user} chatId={chat.id} nickname={user.nickname}/> : null) : <ArchiveObject user={user} chatArchiveList={chatArchiveList} setChat={setChat} setShowArchiveList={setShowArchiveList}/>) : null}
            </div>
            <div style={{justifyContent: 'flex-end' }}>
              <Map desks={desks} user={user} clouds={clouds} setUser={setUser} setChat={setChat} setShowArchiveList={setShowArchiveList} setChatArchiveList={setChatArchiveList} showArchiveList={showArchiveList} />
            </div>
          </div>}
      {user ? (
      <div style={{display:"flex"}}>
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
