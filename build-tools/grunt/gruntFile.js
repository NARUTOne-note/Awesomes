
// module.exports = function (grunt) {
//   // 项目配置
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     concat:{
//     	options:{
//     		separator:';'
//     	},
//     	dist:{
//     		src:['src/zepto.js','src/app.js','src/web.js'],
//     		dest:'dest/libs.js'
//     	}
//     },
//     uglify: {
//       options: {
//         banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//       },
//       build: {
//         src: 'src/<%=pkg.file %>.js',
//         dest: 'dest/<%= pkg.file %>.min.js'//压缩文件路径
//       }
//     }
//   });
//   // 加载提供"uglify"任务的插件
//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   // 加载 concat 任务插件
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   // 默认任务
//   grunt.registerTask('default', ['concat','uglify']);//先合并，再压缩
// }

// 自定义任务
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  //为了介绍自定义任务搞了一个这个
  grunt.registerTask('build', 'require demo', function () {
    //任务列表
    var tasks = ['requirejs'];
    //源码文件
    var srcDir = 'src';
    //目标文件
    var destDir = 'dest';
    //设置参数
    grunt.config.set('config', {
      srcDir: srcDir,
      destDir: destDir
    });
    //设置requireJs的信息
    var taskCfg = grunt.file.readJSON('gruntCfg.json');
    var options = taskCfg.requirejs.main.options,
        platformCfg = options.web,
        includes = platformCfg.include,
        paths = options.paths;
    var pos = -1;
    var requireTask = taskCfg.requirejs;
    options.path = paths;
    options.out = platformCfg.out;
    options.include = includes;
    //运行任务
    grunt.task.run(tasks);
    grunt.config.set("requirejs", requireTask);
  });
}