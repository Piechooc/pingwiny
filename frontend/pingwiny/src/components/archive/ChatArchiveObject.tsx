import {Sprite} from '@inlet/react-pixi';
import {Texture} from 'pixi.js';

import ArchiveImg from './BlackSoul.png';
import archiveButton from "./button.png";
import React from "react";
import User from '../../types/User';

type Props = {
    showButton: boolean,
    handleButtonClick: () => void,
    archiveCoords: { x: number, y: number },
    user: User
};


const ChatArchiveObject = ({showButton, handleButtonClick, archiveCoords, user}: Props) => {
    return (
        <>
            <Sprite
                x={archiveCoords.x}
                y={archiveCoords.y}
                scale={{x: 0.2, y: 0.2}}
                texture={Texture.from(ArchiveImg)}
            />
            {showButton ? <Sprite
                texture={Texture.from(archiveButton)}
                x={user.x + 55}
                y={user.y - 85}
                scale={{x: 0.4, y: 0.4}}
                interactive={true}
                pointerdown={handleButtonClick}
            /> : null}
        </>
    );
};

export default ChatArchiveObject;
