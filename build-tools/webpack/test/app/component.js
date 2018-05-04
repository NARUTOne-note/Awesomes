'use strict';

// module.exports = function () {
//   var element = document.createElement('h1');
//
//   element.innerHTML = 'Hello world';
//
//   return element;
// };

import React from 'react'

import './component.less'

class Component extends React.Component{
  render(){
      return( <div>
        Helllo World
        <img src={require ('./react.jpg')}/>
        <div className="cleckbox">
          <span className="status"></span>
          <span>选择</span>
        </div>
      </div>
    )
  }
}
export default Component
