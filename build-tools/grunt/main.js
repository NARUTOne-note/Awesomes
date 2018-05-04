require.config({
 baseUrl: '',
 shim: {
  $: {
      exports: 'zepto'
  },
  _: {
   exports: '_'
  },
  B: {
   deps: [
    '_',
    '$'
     ],
   exports: 'Backbone'
  }
 },
 paths: {
  '$': 'src/zepto',
  '_': 'src/app',
  'B': 'src/web'
 }
});
requirejs(['B'], function (b) {
});