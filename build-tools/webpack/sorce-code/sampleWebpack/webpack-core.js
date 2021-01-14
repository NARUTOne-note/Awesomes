const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 获取主入口文件
const getMainFileInfo = (file) => {
  const content = fs.readFileSync(file, 'utf-8');
  console.log(content);

  // 解析成AST
  const ast = parser.parse(content,{
    sourceType:'module' // 表示我们要解析的是ES模块
  });
  console.log(ast);

  // 解析获取依赖
  const deps = {};
  traverse(ast, {
    ImportDeclaration({node}){
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
    }
  });
  console.log(deps);

  // 解析代码 ES6 -> ES5
  const {code} = babel.transformFromAst(ast,null,{
    presets:["@babel/preset-env"]
  })
  console.log(code);

  return {
    file,
    deps,
    code
  }
}

// dfs 获取依赖
const parseModules = (file) =>{
  const entry =  getModuleInfo(file);
  const temp = [entry];
  for (let i = 0;i<temp.length;i++){
      const deps = temp[i].deps;
      if (deps){
          for (const key in deps){
              if (deps.hasOwnProperty(key)){
                  temp.push(getModuleInfo(deps[key]))
              }
          }
      }
  }
  console.log(temp);

  // 修改依赖返回格式
  temp.forEach(moduleInfo=>{
    depsGraph[moduleInfo.file] = {
        deps:moduleInfo.deps,
        code:moduleInfo.code
    }
  });
  console.log(depsGraph);
  return depsGraph;
}

// 执行代码
const bundle = (file) =>{
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
      function require(file) {
          function absRequire(relPath) {
              return require(graph[file].deps[relPath])
          }
          var exports = {}
          (function (require,exports,code) {
              eval(code)
          })(absRequire,exports,graph[file].code)
          return exports
      }
      require('${file}')
  })(${depsGraph})`

}
const content = bundle('./src/index.js')

console.log(content);
