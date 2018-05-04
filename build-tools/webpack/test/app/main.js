'use strict';
// var component = require('./component.js');
//
// document.body.appendChild(component());


import React from 'react'
import {render} from 'react-dom'
import Component from './component'

import './main.css'

let main = function(){
render(<Component />,document.getElementById('app'));
}
main();
