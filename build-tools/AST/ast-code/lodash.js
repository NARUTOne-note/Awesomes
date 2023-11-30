const lodash = require('lodash');

const ks = [
  {key: 'a.b.c', value: 1},
  {key: 'a.b.d', value: 2},
  {key: 'a.b.e', value: 3},
  {key: 'a.b.f', value: 4},
  {key: 'a.b.g', value: 5},
  {key: 'a.c', value: 1},
  {key: 'a.d', value: 1},
]

const res = {b: 1, a: {b: { 'sdf': 'sdfs'}}};

ks.forEach(({key, value}) => {
  if (!lodash.has(res, key)) {
    lodash.setWith(res, key.split('.'), value, Object);
  }
});
console.log(res);