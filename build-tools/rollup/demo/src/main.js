import foo from './foo.js';
import npmdep from './npm-dep.js';
import { version, name } from '../package.json'

export default function () {
  console.log(name + ' version ' + version);
  console.log(foo);
  console.log(foo('NARUTOne'));

  console.log(npmdep());
}