import './App.css';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import LoginPage from './components/login/LoginPage';
import { useState } from 'react';
import User from './types/User';
import StatusButton from "./components/status/Status"
import Cloud from './types/Cloud';

import Chat from "./components/chat/Chat";
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
          <div style={{display: 'flex'}}>
            <div style={{justifyContent: 'flex-start' }}>
              <Chat userId={user.id} chatId={user.id} nickname={user.nickname}/>
            </div>
            <div style={{justifyContent: 'flex-end' }}>
              <Map desks={desks} user={user} clouds={clouds} setUser={setUser}/>
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
