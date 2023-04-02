import React, {useEffect, useState} from 'react';
import {Container, Graphics, Stage, Text} from '@pixi/react';
import {Rectangle} from 'pixi.js';
import {List, ListItem, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Message from '../../types/Message';
import User from '../../types/User';


interface Props {
    user: User;
    chatId: string;
    nickname: string;
}

const Chat = ({user, chatId, nickname}: Props) => {
    const [messages, setMessages] = useState<Message[]>([{user_id: '234', nickname: 'me', message: 'aaauuu'}]);
    const [inputValue, setInputValue] = useState<string>('');

    // const fetchMessages = async () => {
    //     try {
    //         const response = await fetch('http://penguins-agh-rest.azurewebsites.net/getchat/', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 user_id: userId,
    //                 chat_id: chatId,
    //             })
    //         })

    //         if (response.ok) {
    //             console.log(response);
    //             return response.json();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert('Error: ' + error)
    //     }
    // };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetchMessages().then((data) => {
    //             setMessages(data);
    //         });
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (event: any) => {
        event.preventDefault();
        setMessages([{
            user_id: user.id,
            nickname: user.nickname,
            message: inputValue
        }, ...messages]);
            // Send the message to the server

            // try {
            //     const response = await fetch(`http://penguins-agh-rest.azurewebsites.net/writemessage/`, {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             user_id: userId,
            //             nickname: nickname,
            //             chat_id: chatId,
            //             message: inputValue
            //         }),
            //     });
            //     if (response.ok) {
            //         // Add the message to the list of messages
            //         setMessages([{
            //             user_id: userId,
            //             nickname: nickname,
            //             message: inputValue
            //         }, ...messages]);

            //         // Clear the input value
            //         setInputValue('');
            //     } else {
            //         console.error(`Failed to send message: ${response.status} ${response.statusText}`);
            //     }
            // } catch (error) {
            //     console.error(error);
            // }

    };

    return (
        <div>
            
            <Paper style={{maxHeight:window.innerHeight*0.7, overflow: 'auto'}}>
            <List style={{width: window.innerWidth*0.3}}>
            {messages?.map((message, index) => (
                <ListItem key={index}> {message.nickname}: {message.message}</ListItem>
            ))}
            </List>
            </Paper>
            <form onSubmit={handleKeyDown} style={{display: "flex", flexDirection: "column"}}>
                <TextField  id="outlined-basic" style={{margin:"10px"}} label="Write message" type="text" value={inputValue} onChange={handleInputChange}/>
                <Button variant="contained" style={{margin:"10px"}} type="submit" >Send!</Button>
            </form>
        </div>
    );
};

export default Chat;