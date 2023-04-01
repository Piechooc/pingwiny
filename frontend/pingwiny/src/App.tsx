import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Desk from './types/Desk';
import Map from  './components/map/Map';
import { connect } from 'react-redux';
interface Props{
  desks: Desk[];
}

export const App = ({desks}:Props) =>
{
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end' }}>
      <Map desks={desks}/>
    </div>
  );
};

function mapStateToProps({desks}: Props) {
  return {
    desks,
  };
}

export default connect(mapStateToProps)(App);
//export default App;
