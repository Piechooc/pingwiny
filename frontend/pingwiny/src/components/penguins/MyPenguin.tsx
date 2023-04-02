import { Sprite } from '@inlet/react-pixi';
import React, { Dispatch, useEffect, useState } from 'react';
import { Texture} from 'pixi.js';
import penguinImg from './penguin.png';
import talkButton from './talkButton.png';
import { Text } from '@pixi/react';
import User from '../../types/User';

type Props = {
  user: User,
  otherPenguins: User[],
  setUser: Dispatch<User>,
  handleButtonClick: () => void,
  showButton: boolean
};

const MyPenguin = ({ user, otherPenguins, setUser, handleButtonClick, showButton }: Props) => {
  const [spritePosition, setSpritePosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    // Calculate the distance between MyPenguin and each Penguin
    setUser({x: spritePosition.x, y: spritePosition.y, nickname: user.nickname, id: user.id})
    const distanceThreshold = 100;
    const distances = otherPenguins.map((penguinUser) => {
      const dx = penguinUser.x - spritePosition.x;
      const dy = penguinUser.y - spritePosition.y;
      return Math.sqrt(dx * dx + dy * dy);
    });

    // Check if any Penguin is close enough to show the button
    //setShowButton(distances.some((distance) => distance < distanceThreshold));
  }, [spritePosition]);

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
      text={user.nickname}
      x={spritePosition.x+50}
      y={spritePosition.y+120}
      scale={{ x: 0.8, y: 0.8 }}
    />
    {showButton ? <Sprite
      texture={Texture.from(talkButton)}
      x={spritePosition.x}
      y={spritePosition.y}
      scale={{ x: 0.4, y: 0.4 }}
      interactive={true}
      pointerdown={handleButtonClick}
    />:null}
    </>
  );
};

export default MyPenguin;
