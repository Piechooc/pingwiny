import { Graphics } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react'

const MyPenguin = () => {
  const [spritePosition, setSpritePosition] = useState({ x: 100, y: 100 });
    
  useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 5;
    
      if (e.key === "ArrowUp") {
        setSpritePosition(prevPosition => ({
          ...prevPosition,
          y: prevPosition.y - speed
        }));
      } else if (e.key === "ArrowDown") {
        setSpritePosition(prevPosition => ({
          ...prevPosition,
          y: prevPosition.y + speed
        }));
      } else if (e.key === "ArrowLeft") {
        setSpritePosition(prevPosition => ({
          ...prevPosition,
          x: prevPosition.x - speed
        }));
      } else if (e.key === "ArrowRight") {
        setSpritePosition(prevPosition => ({
          ...prevPosition,
          x: prevPosition.x + speed
        }));
      }
    };
    
  return (
    <Graphics x={spritePosition.x} y={spritePosition.y}
    draw={g => {
        g.clear();
        g.beginFill(0x000000);
        g.drawCircle(0, 0, 30);
        g.endFill();
        }}
        />
  )
}

export default MyPenguin