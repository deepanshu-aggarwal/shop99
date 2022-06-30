import React from 'react';
import {createRoot} from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialState } from './context/initialState';
import {StateProvider} from "./context/StateProvider"
import reducer from './context/reducer';

const root = createRoot(document.getElementById('root'))

root.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>
);
