import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
import Chat from "./components/chat/Chat";
interface Props{
  desks: Desk[],
}

export const App = ({desks}:Props) =>
{
  const [user, setUser] = useState<User>();

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :
      <div style={{display: 'flex'}}>
          <div style={{justifyContent: 'flex-start' }}>
              <Chat userId={user.id} chatId={user.id} nickname={user.nickname}/>
          </div>
          <div style={{justifyContent: 'flex-end' }}>
              <Map desks={desks} user={user}/>
          </div>
      </div>}
    </>
  );
};

export default App;
