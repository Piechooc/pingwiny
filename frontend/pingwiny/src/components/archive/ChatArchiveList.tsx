import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArchiveList from "../../types/ArchiveList";
import User from "../../types/User";
import {Dispatch} from "react";
import ChatType from "../../types/ChatType";

interface Props {
    user: User,
    chatArchiveList: ArchiveList[],
    setChat: Dispatch<ChatType>,
    setShowArchiveList: Dispatch<boolean>
}


export default function ChatArchive({user, chatArchiveList, setChat, setShowArchiveList}: Props) {
    const handleListItemClick = (chat_id: string) => {
        fetch('http://127.0.0.1:5050/getchat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                chat_id: chat_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
              setChat(data);
              setShowArchiveList(false);
            })
            .catch(error => {
                console.error(error);
                alert('Error: ' + error)
            });
    };

    return (
        <Box sx={{height: 750, overflow: 'auto', width: 600, bgcolor: 'background.paper', x: 1000, y: 1000}}>
            <List component="nav" aria-label="archived chats">

                {chatArchiveList.map((chat) =>
                    <ListItemButton
                        onClick={(event) => handleListItemClick(chat.chat_id)}
                    >
                        <ListItemText primary={chat.chat_id + chat.tags[0]}/>
                    </ListItemButton>
                )}

            </List>
        </Box>
    );
}