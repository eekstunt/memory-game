import React from 'react';
import { createRoot} from 'react-dom/client';
import { App } from './components/App/App'
import {cardsConfig} from "./settings";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', appHeight);
appHeight();

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
cardsConfig.forEach((image) => fetch(image));

