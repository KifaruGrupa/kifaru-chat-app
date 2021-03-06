import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css'
import './styles/tailwind.css'
import './styles/custom/index.scss'
import Main from './main';
import * as serviceWorker from './serviceWorker';

const app  = document.getElementById('root');

ReactDOM.render(<Main />, app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
