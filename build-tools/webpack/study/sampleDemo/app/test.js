
/**
 * 代码分离 test
 * @return {[type]} [description]
 */
 function getComponent2() {
 	return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
   var element = document.createElement('div');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;

 }).catch(error => 'An error occurred while loading the component');
}

getComponent2().then(component => {
  document.body.appendChild(component);
})

