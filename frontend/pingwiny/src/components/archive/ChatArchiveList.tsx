import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArchiveList from "../../types/ArchiveList";

interface Props {
    chatArchiveList: ArchiveList[],
}


export default function ChatArchive({chatArchiveList}: Props) {
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

                {chatArchiveList.map((chat) =>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemText primary={chat.chat_id + chat.tags[0]}/>
                    </ListItemButton>
                )}

            </List>
        </Box>
    );
}