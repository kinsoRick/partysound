import React from 'react';
import { createRoot } from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import { Provider } from 'react-redux';

import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';
import initTranslation from './services/locales';

import store from './store';

bridge.send('VKWebAppInit');

initTranslation();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
// TODO [$64c68fd74a37ff00096d52eb]: TESTING
// TODO [$64c69239da2fbf0008312bc4]: NEW TESTING
// TODO [$64c69320221e23000857e766]: TESTING AGAIN....
// TODO [$64c69529b2b8d900098fede8]: FIX AGAINN...
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
