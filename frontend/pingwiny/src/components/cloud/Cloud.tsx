import {Sprite} from '@inlet/react-pixi';
import React, {useEffect, useState} from 'react';
import Cloud from '../../types/Cloud';
import "./cloud.css"

type Props = {
    cloud: Cloud
};

const Cloud = ({cloud: {x, y, text}}: Props) => {
    const [spritePosition, setSpritePosition] = useState({x, y});

    useEffect(() => {
        setSpritePosition({x, y});
    }, [x, y]);

    return (
        <>
            <Sprite
                x={spritePosition.x}
                y={spritePosition.y}
                scale={{x: 0.2, y: 0.2}}
            />
        </>
    );
};

export default Cloud;
