import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
import Cloud from './types/Cloud';
interface Props{
  desks: Desk[],
  clouds: Cloud[],
}

export const App = ({desks, clouds}:Props) =>
{
  const [user, setUser] = useState<User>();

  return (
    <>
      {user===undefined ? <LoginPage  setUser={setUser}/> :           
        <div style={{display: 'flex', justifyContent: 'flex-end' }}>
            <Map desks={desks} user={user} clouds={clouds}/>
        </div>}
    </>
  );
};

export default App;
