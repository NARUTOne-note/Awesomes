/**
 * @description mvvm Compile
 */

class Compile{
  constructor(el,vm){
      this.el = this.isElementNode(el)?el:document.querySelector(el);
      this.vm = vm;
      if(this.el){
          //如果这个元素能获取到 我们才开始编译
          //1.先把这些真实的DOM移入到内存中 fragement （文档碎片）, 减少重复操作页面DOM导致的渲染性能消耗
          let fragment = this.nodeToFragment(this.el);
          //2.编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
          this.compile(fragment);
          //3.把编译好的fragement再返回页面去
          this.el.appendChild(fragment);
      }
  }

  /**
   * 判断是否是一个元素节点
   * @param node
   * @returns {boolean}
   */
  isElementNode(node){
    return node.nodeType === 1;
  }

  /**
   * 判断属性名字是不是包含'v-'
   * @param name
   * @returns {*|void}
   */
    isDirective(name){
      return name.include('v-');
  }

  nodeToFragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild){
      fragment.appendChild(firstChild);
    }
    //内存中的节点
    return fragment;
  }

  compile(fragment){
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node=>{
        if(this.isElementNode(node)){
            //元素节点，它里面有可能会继续嵌套子节点，所以需要深入递归
            //这里需要编译元素节点
            this.compileElement(node);
            this.compile(node);
        }else{
            //文本节点
            //这里需要编译文本节点
            this.compileText(node);
        }
    });
  }

  /**
   * 编译带'v-'属性的元素节点，DOM元素不能用正则判断
   * @param node
   */
  compileElement(node){
      let attrs = node.attributes;
      Array.from(attrs).forEach(attr => {
          let attrName = attr.name;
          if (this.isDirective(attrName)){
              let expr = attr.value;
              let type = attrName.slice(2);
              //编译工具方法，后面详解
              CompileUtil[type](node,this.vm,expr);
          }
      });
  }

  // “{{a}} {{b}} {{c}}”或者 "{{abc}}"
  compileText(node){
    let text = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(text)){
        //node this.vm.$data text
        //编译工具方法，后面详解
        CompileUtil['text'](node,this.vm,text);
    }
  }
}


/**
 * 编译的工具方法
 * @type {{}}
 */

const CompileUtil = {

  /**
   * 获取实例上对应的数据，返回 vm.$data.XXX，'info.a' => [info,a] vm.$data.info.a
   * @param vm
   * @param expr
   * @returns {T}
   */
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((pre,next)=>{
        return pre[next];
    },vm.$data);
  },

  /**
   * 获取编译文本后的结果  {{xx}}
   * @param vm
   * @param text
   * @returns {string | * | void}
   */
  getTextVal(vm,text){
    return text.replace(/\{\{([^}]+)\}\}/g, (...arguments)=>{
        //拿到第一个分组，并且要取得没有空格的字符串，否则会报错
        return this.getVal(vm,arguments[1].trim());
    });
  },

  /**
   * 文本节点编译
   * @param node
   * @param vm
   * @param text
   */
  text(node,vm,text){
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm,text);

    //为每一个文本添加观察者，{{a}},{{b}} 既观察a也观察b
    text.replace(/\{\{([^}]+)\}\}/g, (...arguments)=>{
        new Watcher(vm,arguments[1].trim(),(newValue) => {
            //若数据变化，文本节点要重新获取依赖的属性，更新文本中的内容
            updateFn && updateFn(node,this.getTextVal(vm,newValue));
        });
    });

    //这个方法存在再去调用
    updateFn && updateFn(node,value);
  },

  /**
   * 赋新值
   * @param vm
   * @param expr 新的值
   * @param value
   * @returns {T}
   */
  setVal(vm,expr,value){ //expr => [info,a]
    expr = expr.split('.');
    return expr.reduce((pre,next,currentIndex)=>{
        if (currentIndex === expr.length-1){
            return pre[next] = value;
        }
        return pre[next];
    },vm.$data);
  },

  /**
   * 带v-model属性的元素节点编译
   * @param node
   * @param vm
   * @param expr
   */
  model(node,vm,expr){
    let updateFn = this.updater['modelUpdater'];

    //这里应该加一个监控，数据变化了，就调用watcher的回调函数cb(),将新的值传递过来
    //强调一下，他不会一创建Watcher就主动调用cb()，直到调用Watcher.update()时，才会调用这个cb()
    new Watcher(vm,expr,(newValue)=>{
        updateFn && updateFn(node,this.getVal(vm,expr));
    });

    node.addEventListener('input',(e)=>{
        let newValue = e.target.value;
        this.setVal(vm,expr,newValue);
    });
    //这个方法存在再去调用
    updateFn && updateFn(node,this.getVal(vm,expr));
  },

  html(){
    //todo
  },

  /*公共逻辑的复用*/
  updater:{
    /**
     * 文本更新
     * @param node
     * @param value
     */
    textUpdater(node,value){
        node.textContent = value;
    },
    /**
     * 输入框更新
     * @param node
     * @param value
     */
    modelUpdater(node,value){
        node.value = value;
    }
  }
}