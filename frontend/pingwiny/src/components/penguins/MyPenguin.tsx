import { Sprite } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react';
import { Texture} from 'pixi.js';
import penguinImg from './penguin.png';
import { Text } from '@pixi/react';
import User from '../../types/User';

type Props = {
  user: User
};

const MyPenguin = ({ user:{x, y, id, nickname="me"} }: Props) => {
  const [spritePosition, setSpritePosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    const speed = 5;

    if (e.key === 'ArrowUp') {
      setSpritePosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y - speed,
      }));
    } else if (e.key === 'ArrowDown') {
      setSpritePosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + speed,
      }));
    } else if (e.key === 'ArrowLeft') {
      setSpritePosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - speed,
      }));
    } else if (e.key === 'ArrowRight') {
      setSpritePosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x + speed,
      }));
    }
  };

  return (
    <>
    <Sprite
      x={spritePosition.x}
      y={spritePosition.y}
      scale={{ x: 0.2, y: 0.2 }}
      texture={Texture.from(penguinImg)}
    />
    <Text
      text={nickname}
      x={spritePosition.x+50}
      y={spritePosition.y+120}
      scale={{ x: 0.8, y: 0.8 }}
    />
    </>
  );
};

export default MyPenguin;
