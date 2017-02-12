import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
import Clock from 'Clock';

ReactDOM.render(
    <div>
        <Hello></Hello>,
        <Clock></Clock>
    </div>,
    document.getElementById('root')
)