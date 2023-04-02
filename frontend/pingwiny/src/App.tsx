import './App.css';
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
import ChatArchive from "./types/ChatArchive";

interface Props{
  desks: Desk[],
  clouds: Cloud[],
}

export const App = ({desks, clouds}:Props) =>
{
  const [user, setUser] = useState<User>();
  const [showArchiveList, setShowArchiveList] = useState(false);

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

  // const handleArchiveButtonClick = () => {
  //     setShowArchiveList={true}
  // };

  const [chat, setChat] = useState<ChatType>();

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :
          <div style={{display: 'flex', }}>
            <div style={{justifyContent: 'flex-start'}}>
              {user ? (!showArchiveList ? (chat ? <Chat user={user} chatId={chat.id} nickname={user.nickname}/> : null) : <ArchiveObject chatList={chatArchiveList}/>) : null}
            </div>
            <div style={{justifyContent: 'flex-end' }}>
              <Map desks={desks} user={user} clouds={clouds} setUser={setUser} setShowArchiveList={setShowArchiveList} showArchiveList={showArchiveList} />
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
