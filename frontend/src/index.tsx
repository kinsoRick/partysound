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

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
