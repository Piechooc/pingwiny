import React, {useEffect, useState} from 'react';
import {Container, Graphics, Stage, Text} from '@pixi/react';
import {Rectangle} from 'pixi.js';

interface Message {
    user: string;
    text: string;
}

interface Props {
    userId: string;
    chatId: string;
}

const Chat = ({userId, chatId}:Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
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
        fetchMessages().then((data) => {
            setMessages(data);
        });
    }, [userId, chatId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Send the message to the server
            const message = { user: 'me', text: inputValue };
            try {
                const response = await fetch(`http://localhost:3000/messages?user_id=${userId}&chat_id=${chatId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message),
                });
                if (response.ok) {
                    // Add the message to the list of messages
                    const newMessage = await response.json();
                    setMessages([...messages, newMessage]);

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
                <Text text={inputValue} x={160} y={555}/>
            </Container>
        </Stage>
    );
};

export default Chat;