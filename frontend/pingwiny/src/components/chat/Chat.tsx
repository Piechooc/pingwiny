import React, {useEffect, useState} from 'react';
import {Container, Graphics, Stage, Text} from '@pixi/react';
import {Rectangle} from 'pixi.js';
import {TextField} from "@mui/material";
import user from "../../types/User";

interface Message {
    user: string;
    text: string;
}

interface Props {
    userId: string;
    chatId: string;
    nickname: string;
}

const Chat = ({userId, chatId, nickname}:Props) => {
    const [messages, setMessages] = useState<string[]>('');
    const [inputValue, setInputValue] = useState<string>('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://penguins-agh-rest.azurewebsites.net/getchat/', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId,
                    chat_id: chatId,
                })
            })

            if (response.ok) {
                return response.json();
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + error)
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages().then((data) => {
                setMessages(data);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Send the message to the server
            const message = { user: 'me', text: inputValue };
            try {
                const response = await fetch(`http://penguins-agh-rest.azurewebsites.net/writemessage/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: userId,
                        nickname: nickname,
                        chat_id: chatId,
                        message: inputValue
                    }),
                });
                if (response.ok) {
                    // Add the message to the list of messages
                    setMessages([inputValue, ...messages]);

                    // Clear the input value
                    setInputValue('');
                } else {
                    console.error(`Failed to send message: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const hitArea = new Rectangle(0, 0, 500, 30);

    return (
        <Stage width={window.innerWidth*0.3} height={window.innerHeight*0.9}>
            <Container>
                {messages?.map((message, index) => (
                    <Text key={index} text={`${message.user}: ${message.text}`} y={index * 30} />
                ))}
                <Graphics
                    height={30}
                    width={500}
                    x={150}
                    y={550}
                    interactive
                    hitArea={hitArea}
                    pointerdown={handleKeyDown}
                />
                <TextField id={"input"} label={"Write message"} value={inputValue} onChange={handleInputChange}/>
            </Container>
        </Stage>
    );
};

export default Chat;