import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

const App = hot(HelloWorld);

ReactDOM.render(<App />, document.getElementById('root'));
