import {Sprite} from '@inlet/react-pixi';
import {Texture} from 'pixi.js';

import ArchiveImg from './BlackSoul.png';
import archiveButton from "./button.png";
import React from "react";

type Props = {
    showButton: boolean,
    handleButtonClick: () => void
};


const ChatArchiveObject = ({showButton, handleButtonClick}: Props) => {
    return (
        <>
            <Sprite
                x={1100}
                y={20}
                scale={{x: 0.2, y: 0.2}}
                texture={Texture.from(ArchiveImg)}
            />
            {showButton ? <Sprite
                texture={Texture.from(archiveButton)}
                x={1080}
                y={60}
                scale={{x: 0.4, y: 0.4}}
                interactive={true}
                pointerdown={handleButtonClick}
            /> : null}
        </>
    );


};

export default ChatArchiveObject;
