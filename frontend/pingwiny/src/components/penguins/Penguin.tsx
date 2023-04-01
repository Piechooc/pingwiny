import { Sprite } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react';
import { TextStyle, Texture } from 'pixi.js';
import { Text } from '@pixi/react';

import penguinImg from './penguin.png';
import User from '../../types/User';

type Props = {
  user: User
};

const Penguin = ({ user:{x, y, id, nickname} }: Props) => {
  const [spritePosition, setSpritePosition] = useState({ x, y });

  useEffect(() => {
    setSpritePosition({ x, y });
  }, [x, y]);

  return (
    <>
      <Sprite
        x={spritePosition.x}
        y={spritePosition.y}
        scale={{ x: 0.2, y: 0.2 }}
        texture={Texture.from(penguinImg)}
      />
      {nickname && (
        <Text
          text={nickname}
          x={spritePosition.x + 50}
          y={spritePosition.y + 120}
          scale={{ x: 0.8, y: 0.8 }}
        />
      )}
    </>
  );
};

export default Penguin;
