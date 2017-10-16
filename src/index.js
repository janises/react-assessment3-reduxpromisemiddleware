import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
// import createHashHistory from 'history/createHashHistory';
import store from './store';

// const history = createHashHistory()

ReactDOM.render(

    <Provider store = {store}>
        <Router >
            <App />
        </Router>
            
    </Provider>


, document.getElementById('root'));
registerServiceWorker();
