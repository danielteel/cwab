import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fomantic/semantic.min.css';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <div className='background'>
      <App/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);