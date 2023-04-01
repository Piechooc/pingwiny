import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Desk from './types/Desk';

let desks: Desk[] = [
  { x: 100, y: 100, taken: false },
  { x: 100, y: 300, taken: false },
  { x: 400, y: 100, taken: false },
  { x: 100, y: 500, taken: false },
  { x: 400, y: 300, taken: false },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <App desks={desks}/>
  </React.StrictMode>
);

reportWebVitals();
