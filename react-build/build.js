/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	function init(Global) {
	  var UIWindow = __webpack_require__(1);
	  var UITextView = __webpack_require__(2);
	  var DeveloperTool = __webpack_require__(3);

	  Global['RC'] = Global['RubeCanvas'] = {
	    UI: {
	      Window: UIWindow,
	      TextView: UITextView
	    },
	    Dev: DeveloperTool
	  };

	};

	(function (Global) {
	  Global.RubeCanvasInit = init;
	  Global.RCInit = init;
	})(Window);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var View = __webpack_require__(5);
	var Global = __webpack_require__(6);

	var TextView = __webpack_require__(2);

	/** 屏幕原始宽高获取 **/
	var w = window.innerWidth
	  || document.documentElement.clientWidth
	  || document.body.clientWidth;

	var h = window.innerHeight
	  || document.documentElement.clientHeight
	  || document.body.clientHeight;

	/*
	if (Global.options.debug) {
	 w = w > 400 ? 400 : w;
	 }*/

	var bodyStyle = document.querySelectorAll('body')[0].style;
	bodyStyle.border = 0;
	bodyStyle.margin = 0;
	bodyStyle.padding = 0;
	bodyStyle.background = '#000';


	var UIWindow = React.createClass({displayName: "UIWindow",
	  /** 控件默认属性值 **/
	  getDefaultProps: function () {
	    return {
	      defaultStyle: {
	        backgroundColor: '#fff'
	      }
	    };
	  },
	  /** 控件配置参数初始化 **/
	  getInitialState: function () {
	    View.init.call(this.props, null);
	    var style = this.props.attrs;
	    for (var s in this.props.defaultStyle) {
	      style[s] = this.props.defaultStyle[s];
	    }
	    if (this.props.style) {
	      for (var s in this.props.style) {
	        style[s] = this.props.style[s];
	      }
	    }
	    return {
	      style: style,
	      cxt: null,
	      touchPosition:{
	        nowX:null,
	        nowY:null,
	        startX:null,
	        startY:null
	      }
	    };
	  },
	  componentWillMount: function () {
	    var canvas = document.createElement('canvas');
	    var cxt = canvas.getContext('2d');
	    /** 屏幕缩放计算 **/
	    (function (canvas, ctx, style, context) {
	      var devicePixelRatio = window.devicePixelRatio || 1;
	      var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
	        ctx.mozBackingStorePixelRatio ||
	        ctx.msBackingStorePixelRatio ||
	        ctx.oBackingStorePixelRatio ||
	        ctx.backingStorePixelRatio || 1;
	      var ratio = devicePixelRatio / backingStorePixelRatio;
	      style.scaleRatio = 1;
	      if (devicePixelRatio !== backingStorePixelRatio) {
	        style.scaleRatio = ratio;
	      }
	      context.setState({style: style});
	    })(canvas, cxt, this.state.style, this);
	  },
	  componentDidMount: function () {
	    var canvas = document.getElementById('main');
	    var context = this;
	    canvas.addEventListener('touchstart', function (event) {
	      event.preventDefault();
	      var touch = event.touches[0];
	      var touchPosition = context.state.touchPosition;
	      touchPosition['startX'] = touch.pageX;
	      touchPosition['startY'] = touch.pageY;
	      touchPosition['nowX'] = touch.pageX;
	      touchPosition['nowY'] = touch.pageY;
	      context.setState({touchPosition: touchPosition});
	    });
	    canvas.addEventListener('touchmove', function (event) {
	      event.preventDefault();
	      var touch = event.touches[0];
	      var touchPosition = context.state.touchPosition;
	      touchPosition['nowX'] = touch.pageX;
	      touchPosition['nowY'] = touch.pageY;
	      context.setState({touchPosition: touchPosition});
	    });
	    var cxt = canvas.getContext('2d');
	    var style = this.state.style;
	    var ratio = style.scaleRatio;

	    canvas.width = w * ratio;
	    canvas.height = h * ratio;
	    cxt.scale(ratio, ratio);

	    style.width = canvas.width;
	    style.height = canvas.height;
	    Global.setDp(w, h);
	    this.setState({cxt: cxt, style: style});
	    Global.setContext(cxt);
	    this.measure();
	    this.draw(cxt, style);
	    React.Children.forEach(this.props.children, function (children) {
	      children.props.draw(cxt, style);
	    });
	  },
	  render: function () {
	    console.log(this.state.touchPosition.nowX);
	    var style = this.state.style;
	    return (React.createElement("canvas", {id: "main", style: {
	      width: w,
	      height: h,
	      backgroundColor: style.backgroundColor
	    }}, this.props.children));
	  },
	  /** 控件绘制 **/
	  draw: function (cxt, attrs) {

	  },
	  /** 控件布局 **/
	  layout: function () {

	  },
	  /** 控件布局计算 **/
	  measure: function () {
	    var cxt = this;
	    var measureWork = function (params) {
	      cxt.layout();
	    };
	    React.Children.forEach(this.props.children, function (children) {
	      children.props.measure(cxt, measureWork);
	    });
	  }
	});

	module.exports = UIWindow;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Global = __webpack_require__(6);
	var View = __webpack_require__(5);

	var TextView = React.createClass({displayName: "TextView",
	  /** 控件默认属性值 **/
	  getDefaultProps: function () {
	    return {
	      defaultStyle: {
	        backgroundColor: '#fff',
	        fontSize: 20,
	        fontWeight: 2,
	        color: '#000',
	        text: '111111'
	      }
	    };
	  },
	  getInitialState: function () {
	    View.init.call(this.props, null);
	    this.props.draw = this.draw;
	    this.props.measure = this.measure;
	    var style = this.props.attrs;
	    for (var s in this.props.defaultStyle) {
	      style[s] = this.props.defaultStyle[s];
	    }
	    if (this.props.style) {
	      for (var s in this.props.style) {
	        style[s] = this.props.style[s];
	      }
	    }
	    return {
	      style: style,
	      cxt: null
	    };
	  },
	  componentWillMount: function () {
	  },
	  componentDidMount: function () {
	  },
	  render: function () {
	    if (Global.getContext()) {
	      this.draw(Global.getContext());
	    }
	    return null;
	  },
	  draw: function (cxt) {
	    cxt.save();
	    var style = this.state.style;
	    cxt.fillStyle = style.backgroundColor;
	    cxt.beginPath();
	    cxt.rect(style.x, style.y, style.width, style.height);
	    cxt.closePath();
	    cxt.clip();
	    cxt.fillRect(style.x, style.y, style.width, style.height);
	    var textStyle = cxt.measureText(style.text);
	    cxt.fillStyle = style.color;
	    cxt.fillText(style.text, style.x, style.y + style.fontSize, style.width);
	    cxt.restore();
	  },
	  measure: function (context, callback) {
	    var selfStyle = this.state.style;
	    var parentStyle = context.state.style;
	    (selfStyle.width != View.LayoutParams.matchParent && selfStyle.width != View.LayoutParams.wrapContent)
	    && (selfStyle.width *= Global.getBitX());
	    (selfStyle.height != View.LayoutParams.matchParent && selfStyle.height != View.LayoutParams.wrapContent)
	    && (selfStyle.height *= Global.getBitY());
	    selfStyle.x *= Global.getBitX();
	    selfStyle.y *= Global.getBitY();

	    if (selfStyle.width == View.LayoutParams.matchParent) {
	      selfStyle.width = parentStyle.width;
	    }
	    if (selfStyle.height == View.LayoutParams.matchParent) {
	      selfStyle.height = parentStyle.height;
	    }
	    selfStyle.x += parentStyle.x;
	    selfStyle.y += parentStyle.y;
	    callback([selfStyle.x, selfStyle.y, selfStyle.width, selfStyle.height]);
	  }
	});

	console.log(new TextView());

	module.exports = TextView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * 提供给开发者的接口
	 */

	var React = __webpack_require__(4);
	var bootstrap = __webpack_require__(7);

	var DeveloperTool = function () {
	  this.version = 0.1;
	};

	DeveloperTool.prototype.boot = function (list, documentNode) {
	  var processList = [];
	  for (var i = 0; i < list.length; i++) {
	    list[i].props.action == 'main'
	      ?
	      processList.push({
	        action: 'main',
	        component: list[i]
	      })
	      :
	      processList.push({
	        action: null,
	        component: list[i]
	      })
	  }
	  bootstrap.init(processList);
	  bootstrap.start(documentNode);
	};

	module.exports = new DeveloperTool();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var View = function () {
	};

	/**
	 * View属性加载
	 */
	View.prototype.init = function () {
	  /** 适应父级布局和适应内容布局 **/
	  this.LayoutParams = {
	    matchParent: -1,
	    wrapContent: -2
	  };
	  /** View基本属性 **/
	  this.attrs = {
	    width: this.LayoutParams.wrapContent,
	    height: this.LayoutParams.wrapContent,
	    backgroundColor: '#fff',
	    x: 0,
	    y: 0
	  };
	};

	View.prototype.LayoutParams = {
	  matchParent: -1,
	  wrapContent: -2
	};

	module.exports = new View();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/5.
	 * 记录运行过程中所需要的参数变量和状态等
	 */

	var Global = function () {
	  //唯一标识符产生器
	  var _id = 0
	  /**
	   * 获取唯一标识
	   * @returns {number}
	   */
	  this.getID = function () {
	    return _id++;
	  };

	  //page栈
	  var pageStack = [];
	  /**
	   * 添加page
	   * @param page
	   * @returns {Number} 栈内大小
	   */
	  this.pushPageInStack = function (page) {
	    return pageStack.push(page);
	  };

	  /**
	   * 获取栈顶page
	   * @returns {T}
	   */
	  this.popPageInStack = function () {
	    return pageStack.pop();
	  };

	  //page池
	  var pagePool = {};

	  this.addPageInPool = function (id, page) {
	    pagePool[id] = page;
	  };

	  /**
	   * 宽高的单位值,max=100,按比例分配
	   */
	  var wdpBit, hdpBit;
	  /**
	   * 设置比例
	   * @param float w  实际宽
	   * @param float h  实际高
	   */
	  this.setDp = function (w, h) {
	    wdpBit = parseFloat(w / 100);
	    hdpBit = parseFloat(h / 100);
	  };

	  /**
	   * 根据比例得到实际值
	   * @param float wdp  宽比例值
	   * @param float hdp  高比例值
	   * @returns object {{w: number, h: number}}  宽高实际值
	   */
	  this.getDp = function (wdp, hdp) {
	    return {
	      w: wdp * wdpBit,
	      h: hdp * hdpBit
	    }
	  };

	  this.getBitX = function () {
	    return wdpBit;
	  };

	  this.getBitY = function () {
	    return hdpBit;
	  };

	  var context = null;
	  /** 设置上下文 **/
	  this.setContext = function (cxt) {
	    context = cxt;
	  };

	  /** 获取上下文 **/
	  this.getContext = function () {
	    return context;
	  };
	};

	/**
	 * 全局配置信息
	 * @type object
	 */
	var options = {
	  debug: true                               //是否开启调试模式
	};

	Global.prototype.options = options;

	module.exports = new Global();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * RubeCanvas启动器,封装成page,压栈运行
	 */

	var Page = __webpack_require__(8);
	var Global = __webpack_require__(6);

	/**
	 * mainPage {object} 启动项page
	 */
	var Bootstrap = function () {
	  this.mainPage = null;
	};

	/**
	 * 程序初始化开始
	 * @param list
	 */
	Bootstrap.prototype.init = function (list) {
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i];
	    var action = item.action;
	    var component = item.component;
	    var page = Page.create(component);
	    Global.addPageInPool(page.getID(), page);
	    if (action === 'main') {
	      this.mainPage = page;
	    }
	  }
	};

	Bootstrap.prototype.start = function (documentNode) {
	  if (documentNode) {
	    this.mainPage.mountNode(documentNode);
	  } else {
	    this.mainPage.mountNode(document.body);         //default mount on <body>
	  }
	  Global.pushPageInStack(this.mainPage);
	};

	module.exports = new Bootstrap();







/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * 界面管理器
	 */

	var React = __webpack_require__(4);
	var Global = __webpack_require__(6);
	var Tree = __webpack_require__(9);

	/**
	 * 界面管理器
	 * [node] {object} 页面UI挂载的根节点
	 * _node {object} 页面UI挂载的根节点
	 * _id {int} 页面id
	 * _documentNode {DOM} HTML页面上DOM挂载点
	 * _idTree {object} 界面组件id树
	 */
	var Page = function (node) {
	  this._node = node ? node : null;
	  this._id = Global.getID();
	  this._documentNode = null;
	  this._idTree = Tree.create();
	};

	/**
	 * 挂载页面UI根节点
	 * @param documentNode {DOM} HTML页面上DOM挂载点
	 * @param [node] {object} 页面UI根节点
	 */
	Page.prototype.mountNode = function (documentNode, node) {
	  this._documentNode = documentNode;
	  if (node) {
	    this._node = node;
	  }
	  React.render(this._node, documentNode);
	};

	Page.prototype.getID = function(){
	  return this._id;
	};

	Page.create = function (node) {
	  return new Page(node);
	};

	module.exports = Page;



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * 树型结构,用于构建page的id树等
	 */

	/**
	 * Tree树型结构
	 * _nodeStorage {object} 一个节点存储对象
	 * _nodeMap {object} 一个节点引用存储对象,快速定位查找
	 */
	var Tree = function () {
	  this._nodeMap = {};
	  this.addNode(-1, -1, null);       //根节点
	};

	/**
	 * 添加节点
	 * @param parentIndex {int} 父节点id值 (>=-1)
	 * @param index {int} 当前节点id值 (>=-1)
	 * @param value {*} 当前节点值
	 */
	Tree.prototype.addNode = function (parentIndex, index, value) {
	  if (parentIndex < -1 || index < -1) {
	    return new TypeError('parentIndex or index can not be lt -1');
	  }
	  var node = {parentIndex: parentIndex, index: index, value: value, children: []};
	  this._nodeMap[index] = node;
	  this._nodeMap[parentIndex].children.push(node);
	};

	/** 获取对应id的节点 **/
	Tree.prototype.getNode = function (index) {
	  return this._nodeMap[index];
	};

	/** 删除对应id的节点 **/
	Tree.prototype.deleteNode = function (index) {
	  var node = this._nodeMap[index];
	  var parentNode = this._nodeMap[node.parentIndex];
	  for (var i = 0; i < parentNode.children.length; i++) {
	    if (parentNode.children[i].index === index) {
	      Array.splice.call(parentNode.children, i, 1);
	      break;
	    }
	  }
	  delete this._nodeMap[index];
	};

	/** 更新节点信息 **/
	Tree.prototype.updateNode = function (index, value) {
	  this._nodeMap[index].value = value;
	};

	Tree.create = function () {
	  return new Tree();
	};

	module.exports = Tree;


/***/ }
/******/ ])