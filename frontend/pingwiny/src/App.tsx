import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';

export const App = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <div style={{display: 'flex', justifyContent: 'flex-end' }}>
    <Stage width={1100} height={750}
        options={{ backgroundColor: "e0ebeb", antialias: true }}>
      <Sprite
        // image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
    </div>
  );
};

export default App;
