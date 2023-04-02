import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChatArchive from "../../types/ChatArchive";

interface Props {
    chatList: ChatArchive[],
}


export default function ArchiveList({chatList}: Props) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{height: 750, overflow: 'auto', width: 600, bgcolor: 'background.paper', x: 1000, y: 1000}}>
            <List component="nav" aria-label="archived chats">

                {chatList.map((chat) =>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemText primary={chat.name + chat.tags}/>
                    </ListItemButton>
                )}

            </List>
        </Box>
    );
}