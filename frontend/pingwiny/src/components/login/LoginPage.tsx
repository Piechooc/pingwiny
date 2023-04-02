import React, { Dispatch, useState } from 'react';
import User from '../../types/User';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

interface Props {
    setUser: Dispatch<User>;
}

const LoginPage = ({setUser}:Props) => {
    const [nickname, setNickname] = useState('');
    const handleNicknameChange = (event: any) => {
        setNickname(event.target.value);
    };
        
    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://127.0.0.1:5050/userlogin/' + nickname, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUser(data);
        })
        .catch(error => {
            console.error(error);
            alert('Error: ' + error)
        });
    };

    return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh",alignItems: "center", background: "linear-gradient(to bottom, #8a2be2, #4169E1)" }}>
    <h1>🐧 Welcome to Penguin Office Space! 🐧</h1>
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
        <TextField  id="outlined-basic" style={{margin:"10px"}} label="Nickname" type="text" value={nickname} onChange={handleNicknameChange}/>
        <Button variant="contained" style={{margin:"10px"}} type="submit" >Let's Go! 🐧</Button>
    </form>
    </div>

    );
}

export default LoginPage