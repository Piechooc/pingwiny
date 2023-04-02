import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
interface Props{
  desks: Desk[],
}

export const App = ({desks}:Props) =>
{
  const [user, setUser] = useState<User>();

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :           
        <div style={{display: 'flex', justifyContent: 'flex-end' }}>
            <Map desks={desks} user={user} setUser={setUser}/>
        </div>}
    </>
  );
};

export default App;
