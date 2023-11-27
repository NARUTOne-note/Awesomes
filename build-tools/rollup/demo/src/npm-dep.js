import answer from 'the-answer';
import _merge from 'lodash/merge';

export default () => {
  console.log('the answer is ' + answer);
  
  const a = {a: 1};
  const b = {b: 2};
  console.log(_merge(a, b));
}