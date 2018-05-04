'use strict' 

import _ from 'lodash'
import './test.css'
import WebpackImg from 'public/imgs/webpack.png'
import JSONDATA from 'public/test.json'

import printMe from './print.js'
import { cube } from './math.js'
import { file, helpers } from './globals.js'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.getElementById('app');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('css');

	var myImg = new Image();
	myImg.src = WebpackImg;

	element.appendChild(myImg);

	var p_ele = document.createElement('p');
	p_ele.innerHTML = _.join(['json : ', ""], JSON.stringify(JSONDATA))
	
	element.appendChild(p_ele);

	var btn = document.createElement('button');
	btn.innerHTML = 'check console!';
	btn.onclick = printMe;

	element.appendChild(btn);

	var pre_ele = document.createElement('pre');
	pre_ele.innerHTML = [
		'Hello webpack !',
		'5 cubed is equal to ' + cube(5)
	].join('\n\n');

	element.appendChild(pre_ele);

  return element;
}


document.body.appendChild(component());


/**
 * module.hot.accept 触发热更新
 */

// let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
// document.body.appendChild(element);

// if (module.hot) {
//   module.hot.accept('./print.js', function() {
// 	  console.log('Accepting the updated printMe module!');
// 	  printMe();
// 	  document.body.removeChild(element);
// 	  element = component(); // 重新渲染页面后，component 更新 click 事件处理
// 	  document.body.appendChild(element);
//   })
// }