/**
 * create a framework example 
 * 
 * date: 2017/07/31
 * author: NARUTOne
 * 
 * description: octJS 库采用类jquery库创建，链式使用。
 *
 */

;(
	function() {
		
		window.O = Oct = function(selector, root_id, tag) {
			return new Octobj(selector, root_id, tag);
		};
		
		Oct.version = '0.1';
		
		/**
		 * @name: Oct, 全局设置类$
		 * @param: selector, 选择器
		 * @param: [root_id], 父级id
		 * @param: [tag], 返回标签
		 *
		 */
		var Octobj = function(selector, root_id, tag) {
			
			// args: 存储root_id的子标签 
			// type: 类型标记，id("#"), class(".") 或者 tag("&")。 tag也加标记是为了代码方便
			// eles: 临时的，存储`selector`变量里"# . &"标记后面的字符串
			// selector_exp: 用来匹配标签的正则规则
			var agrs, type, eles; 
			var selector_exp = /^(?:#(\w-_)+|\.(\w-_)+|(\w)+)$/; 
			
			// this.elements: 存储函数结束后返回对象
			this.elements = [];
			
			// 防止以下情况: 类$(""), $(null), $(undefined), $(false)
			if (!selector) {
			    return this;
			}
			
			if (root_id) {
			    root_id = typeof root_id == "string" ? document.getElementById(root_id) : root_id;
			} else {
			    root_id = document.body;
			}
			
			tag = tag || "*";
			if (tag !== "*") {
			    tag = tag.slice(1);
			}
						
			// deal with "this". "this" usually means a actual tag like" <div class=​"colors">​hello</div>​"
			if (typeof(selector) == "object") {
				this.elements.push(selector);
				return;
			}
			
			
			// "querySelector" for samrt browser
			if (document.querySelectorAll) {
			    // 因为我用'&'符号来标记标签 ，所以要用"replace()"去掉'&' 
			    var node_list = document.querySelectorAll(selector.replace("&", ""))
			    for (var i in node_list) {
			        if (node_list[i].tagName !== undefined) {
			            // 把符合要求的元素存入`this.elements`
			            this.elements.push(node_list[i]);
			        }
			    }
			}
			else {
				// use lowercase to judge,and delete the space initio,then slpite by one or more space.
				selector = selector.replace(/^\s+/, "").split(/\s+/);
	
				// if dont point out the "root_id" and "tag", "args" is all the tags in document
				args = root_id.getElementsByTagName(tag);
				type = selector[0].charAt(0);
				eles = selector[0].slice(1);
	
				if (type === ".") {
					for (var i in args) {
						if(args[i].className) {
	
							// className maybe have more than one class, so split it by spaces
							var r = args[i].className.split(/\s+/);
							for (var j in r) {
								if (r[j] === eles) {
									this.elements.push(args[i]);
								}
							}
						}
					}
				}
	
				else if (type === "#") {
					for (var i in args) {
						if(args[i].id) {
							var r = args[i].id.split(/\s+/);
							for (var j in r) {
								if (r[j] === eles) {
									this.elements.push(args[i]);
								}
							}
						}
					}
				}
	
				else if (type === "&") {
					for (var i in args) {
						// You can "console.log(args[i]);" to see the last one is "length" which has noe "tagName"
						if (i !== "length" && typeof args[i] !== "function") {
	
							// "args[i].tagName" in browswer recognize uppercase, so base on coding habbit, use lowercase to juge.
							if (args[i].tagName.toLowerCase() === eles.toLowerCase()) {
								this.elements.push(args[i]);
							}
						}
					}
	
				}
			}
	
			// be careful!! here return "this",not "this.elememts", so do all the function.
			// return this;    这是构造函数， 实例化之后自动返回this对象，不需要再返回this对象了   
		}
		
		
		/************** Octobj.prototype , Fn*****************/
		
		// DOM型Fn
		
		OctObj.prototype = {
			html: function() {}
		};
		
		/***************** Oct.Fn ******************************/
		
		// 功能型、BOM等Fn
		Oct = {};
		Oct.sort = function(){}
		
	}
)(window);
