import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  desks: [
    { x: 100, y: 100, taken: false },
    { x: 100, y: 300, taken: false },
    { x: 400, y: 100, taken: false },
    { x: 100, y: 300, taken: false },
    { x: 400, y: 300, taken: false },
    // Add more desks here
  ],
};

const reducer = (state = initialState, action: { type: any; }) => {
  switch (action.type) {
    // Add any state update logic here
    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store} children={<App/>} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
