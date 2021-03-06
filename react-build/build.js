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
	  var UIImageView = __webpack_require__(3);
	  var UILinearLayout = __webpack_require__(4);
	  var DeveloperTool = __webpack_require__(5);
	  var View = __webpack_require__(6);

	  Global['RC'] = Global['RubeCanvas'] = {
	    UI: {
	      Window: UIWindow,
	      TextView: UITextView,
	      ImageView: UIImageView,
	      LinearLayout: UILinearLayout
	    },
	    Dev: DeveloperTool,
	    Params: {
	      Layout: View.LayoutParams
	    }
	  };

	};

	if (Window) {
	  (function (Global) {
	    Global.RubeCanvasInit = init;
	    Global.RCInit = init;
	  })(Window);
	}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var View = __webpack_require__(6);
	var UImixin = __webpack_require__(8);
	var UIListener = __webpack_require__(9);
	var Global = __webpack_require__(10);

	/** 屏幕原始宽高获取 **/
	var w = window.innerWidth
	  || document.documentElement.clientWidth
	  || document.body.clientWidth;

	var h = window.innerHeight
	  || document.documentElement.clientHeight
	  || document.body.clientHeight;

	if (Global.options.debug) {
	  w = w > 400 ? 400 : w;
	}
	Global.setDp(w, h);

	var bodyStyle = document.querySelectorAll('body')[0].style;
	bodyStyle.border = 0;
	bodyStyle.margin = 0;
	bodyStyle.padding = 0;
	bodyStyle.background = '#000';

	var UIWindow = React.createClass({displayName: "UIWindow",
	  mixins: [UImixin, UIListener],
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
	    this.props._id = this.props.id || Global.getID();
	    this.componentOperaInit();
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
	      actualStyle: style,
	      update: false,
	      touchPosition: {
	        nowX: null,
	        nowY: null,
	        startX: null,
	        startY: null
	      }
	    };
	  },
	  componentWillMount: function () {
	    this.buildNodeTree(this.props._page, -1, this.props._id, this);
	    this.ListenerInit();
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
	    })(canvas, cxt, this.state.style, this);
	  },
	  componentDidMount: function () {
	    var canvas = document.getElementById('main');
	    var context = this;
	    var cxt = canvas.getContext('2d');
	    var style = this.state.style;
	    var ratio = style.scaleRatio;

	    canvas.width = w * ratio;
	    canvas.height = h * ratio;
	    cxt.scale(ratio, ratio);

	    style.width = canvas.width;
	    style.height = canvas.height;
	    Global.setContext(cxt);
	    this.invalidate({actualStyle: style});
	    canvas.addEventListener('touchstart', function (event) {
	      event.preventDefault();
	      var touch = event.touches[0];
	      context.props._page._idTree.iterationNode(function (node) {
	        if (node.checkListener('touchstart', touch.pageX, touch.pageY)) {
	          var isNext = node.responseListener('touchstart');
	          (typeof isNext == 'undefined') && (isNext = true);
	          return isNext;
	        } else {
	          return true;
	        }
	      });
	    });
	  },
	  shouldComponentUpdate: function (nextprops, nextstate) {
	    if (nextstate.update) {
	      var prevStyle = this.state.actualStyle;
	      if (Global.getContext()) {
	        Global.getContext().clearRect(prevStyle.x, prevStyle.y, prevStyle.width, prevStyle.height);
	      }
	    } else {
	      this.state = nextstate;
	      return false;
	    }
	    return true;
	  },
	  componentDidUpdate: function (prevprops, prevstate) {
	    if (this.state.update) {
	      this.measure();
	      this.layout();
	      this.draw(Global.getContext());
	    }
	  },
	  render: function () {
	    var style = this.state.actualStyle;
	    return (
	      React.createElement("canvas", {id: "main", style: {
	        width: w,
	        height: h,
	        backgroundColor: style.backgroundColor
	      }}, this.props.children
	      )
	    );
	  },
	  /** 控件绘制 **/
	  draw: function (cxt) {
	    React.Children.forEach(this.props.children, function (children) {
	      children.props.draw(cxt);
	    });
	  },
	  /** 控件布局 **/
	  layout: function () {
	    var cxt = this;
	    var style = this.state.actualStyle;
	    var layoutWork = function (children, childrenParams) {

	    };
	    var layoutWorkDone = function () {

	    };
	    React.Children.forEach(this.props.children, function (children, index) {
	      children.props.layout(0, 0, layoutWork);
	      if (index == cxt.props.children.length - 1) {
	        layoutWorkDone();
	      }
	    });
	  },
	  /** 控件布局计算 **/
	  measure: function () {
	    var cxt = this;
	    var measureWork = function (children, childrenParams) {
	    };
	    var measureWorkDone = function () {
	    };
	    React.Children.forEach(this.props.children, function (children, index) {
	      children.props.measure(cxt, measureWork);
	      if (index == cxt.props.children.length - 1) {
	        measureWorkDone();
	      }
	    });
	  },
	  invalidate: function (obj) {
	    obj['update'] = true;
	    this.setState(obj);
	  }
	});

	module.exports = UIWindow;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var UImixin = __webpack_require__(8);
	var UIComponentMixin = __webpack_require__(11);
	var UIListenerMixin = __webpack_require__(9);
	var Global = __webpack_require__(10);
	var View = __webpack_require__(6);

	var TextView = React.createClass({displayName: "TextView",
	  mixins: [UImixin, UIComponentMixin, UIListenerMixin],
	  /** 控件默认属性值 **/
	  getDefaultProps: function () {
	    return {
	      defaultStyle: {
	        backgroundColor: '#fff',
	        fontSize: 20,
	        fontWeight: 2,
	        lineCount: null,
	        singleLineNumber: 10,
	        color: '#000',
	        text: '是'
	      }
	    };
	  },
	  draw: function (cxt) {
	    cxt.save();
	    var style = this.state.actualStyle;
	    cxt.fillStyle = style.backgroundColor;
	    cxt.beginPath();
	    cxt.rect(style.x, style.y, style.width, style.height);
	    cxt.closePath();
	    cxt.clip();
	    cxt.fillRect(style.x, style.y, style.width, style.height);
	    cxt.fillStyle = style.color;
	    cxt.fillText(style.text, style.x, style.y + style.fontSize, style.width);
	    cxt.restore();
	  },
	  measure: function (parent, callback) {
	    var selfStyle = this.state.style;
	    var parentStyle = parent.state.style;
	    var actualStyle = this.state.actualStyle;
	    var canvas = Global.getContext();
	    if (selfStyle.width == View.LayoutParams.matchParent) {
	      actualStyle.width = parentStyle.width;
	    }
	    if (selfStyle.height == View.LayoutParams.matchParent) {
	      actualStyle.height = parentStyle.height;
	    }
	    var textLength = canvas.measureText(selfStyle.text);
	    if (selfStyle.height == View.LayoutParams.wrapContent) {
	      actualStyle.height = (textLength / selfStyle.fontSize * selfStyle.singleLineNumber + 1) * selfStyle.fontSize;
	    }
	    if (selfStyle.width == View.LayoutParams.wrapContent) {
	      if (textLength <= selfStyle.singleLineNumber * selfStyle.fontSize) {
	        actualStyle.width = textLength;
	      } else {
	        actualStyle.width = selfStyle.singleLineNumber * selfStyle.fontSize;
	      }
	    }
	    callback(this, {width: actualStyle.width, height: actualStyle.height});
	  }
	});

	module.exports = TextView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/4/3.
	 */
	var React = __webpack_require__(7);
	var UImixin = __webpack_require__(8);
	var UIComponentMixin = __webpack_require__(11);
	var UIListenerMixin = __webpack_require__(9);
	var Global = __webpack_require__(10);
	var View = __webpack_require__(6);

	var ImageView = React.createClass({displayName: "ImageView",
	  mixins: [UImixin, UIComponentMixin, UIListenerMixin],
	  /** 控件默认属性值 **/
	  getDefaultProps: function () {
	    return {
	      defaultStyle: {
	        image: new Image(),
	        backgroundColor: '#fff',
	        color: '#000',
	        src: './static/photo.jpg'
	      }
	    };
	  },
	  draw: function (cxt) {
	    var context = this;
	    cxt.save();
	    var style = this.state.actualStyle;
	    var selfStyle = this.state.style;
	    cxt.fillStyle = style.backgroundColor;
	    cxt.beginPath();
	    cxt.rect(style.x, style.y, style.width, style.height);
	    cxt.closePath();
	    cxt.clip();
	    cxt.fillRect(style.x, style.y, style.width, style.height);
	    if (style.image.src) {
	      cxt.drawImage(style.image, 0, 0, style.image.width, style.image.height, style.x, style.y, style.width, style.height);
	    } else {
	      style.image.src = style.src;
	      style.image.onload = function () {
	        var flag = false;
	        if (selfStyle.width == View.LayoutParams.wrapContent) {
	          style.width = style.image.width;
	          flag = true;
	        }
	        if (selfStyle.height == View.LayoutParams.wrapContent) {
	          style.height = style.image.height;
	          flag = true;
	        }
	        if (flag) {
	          context.invalidate({actualStyle: style});
	        }
	      };
	    }
	    cxt.restore();
	  },
	  measure: function (parent, callback) {
	    var selfStyle = Global.util.clone(this.state.style);
	    var actualStyle = this.state.actualStyle;
	    var parentStyle = parent.state.style;
	    if (selfStyle.width == View.LayoutParams.matchParent) {
	      actualStyle.width = parentStyle.width;
	    }
	    if (selfStyle.height == View.LayoutParams.matchParent) {
	      actualStyle.height = parentStyle.height;
	    }
	    callback(this, {width: actualStyle.width, height: actualStyle.height});
	  }
	});

	module.exports = ImageView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/23.
	 */

	var React = __webpack_require__(7);
	var UImixin = __webpack_require__(8);
	var Global = __webpack_require__(10);
	var View = __webpack_require__(6);

	var LinearLayout = React.createClass({displayName: "LinearLayout",
	  mixins: [UImixin],
	  getInitialState: function () {
	    this.props._id = Global.getID();
	    this.componentOperaInit();
	    View.init.call(this.props, null);
	    var style = this.props.attrs;
	    if (this.props.defaultStyle) {
	      for (var s in this.props.defaultStyle) {
	        style[s] = this.props.defaultStyle[s];
	      }
	    }
	    if (this.props.style) {
	      for (var s in this.props.style) {
	        style[s] = this.props.style[s];
	      }
	    }
	    (style.width != View.LayoutParams.matchParent && style.width != View.LayoutParams.wrapContent)
	    && (style.width *= Global.getBitX());
	    (style.height != View.LayoutParams.matchParent && style.height != View.LayoutParams.wrapContent)
	    && (style.height *= Global.getBitY());
	    (style.x != 'auto') && (style.x *= Global.getBitX());
	    (style.y != 'auto') && (style.y *= Global.getBitY());
	    return {
	      style: style,
	      update: false,
	      actualStyle: style
	    };
	  },
	  componentWillMount: function () {
	    this.buildNodeTree(this.props._page, this.props._parent._id, this.props._id, this);
	  },
	  shouldComponentUpdate: function (nextprops, nextstate) {
	    if (nextstate.update) {
	      var prevStyle = this.state.actualStyle;
	      Global.getContext().clearRect(prevStyle.x, prevStyle.y, prevStyle.width, prevStyle.height);
	    }
	    return true;
	  },
	  componentDidUpdate: function (prevprops, prevstate) {
	    if (this.state.update) {
	      this.measure();
	      this.layout();
	      this.draw(Global.getContext());
	    }
	  },
	  render: function () {
	    return React.createElement('LinearLayout', null, this.props.children);
	  },
	  draw: function (cxt) {
	    React.Children.forEach(this.props.children, function (children) {
	      children.props.draw(cxt);
	    });
	  },
	  measure: function (parent, callback) {
	    var cxt = this;
	    var staticStyle = cxt.state.style;
	    var runtimeStyle = cxt.state.style;
	    var parentStyle = parent.state.style;
	    var measureWork = function (children, childrenParams) {
	      if (childrenParams.height > runtimeStyle.height || staticStyle.height == View.LayoutParams.wrapContent) {
	        runtimeStyle.height = childrenParams.height;
	      }
	      if (staticStyle.width == View.LayoutParams.wrapContent) {
	        if (runtimeStyle.width == View.LayoutParams.wrapContent) {
	          runtimeStyle.width = childrenParams.width;
	        } else {
	          runtimeStyle.width += childrenParams.width;
	        }
	        runtimeStyle.width = runtimeStyle.width > parentStyle.width ? parentStyle.width : runtimeStyle.width;
	      }
	    };
	    var measureWorkDone = function () {
	      callback(cxt, {width: runtimeStyle.width, height: runtimeStyle.height});
	    };
	    React.Children.forEach(this.props.children, function (children, index) {
	      children.props.measure(cxt, measureWork);
	      if (index == cxt.props.children.length - 1) {
	        measureWorkDone();
	      }
	    });
	  },
	  layout: function (x, y, callback) {
	    var cxt = this;
	    var selfStyle = Global.util.clone(this.state.style);
	    selfStyle.x += x;
	    selfStyle.y += y;
	    this.state.actualStyle = selfStyle;
	    var childrenPositionX = selfStyle.x;
	    var childrenPositionY = selfStyle.y;
	    var layoutWork = function (children, childrenParams) {
	    };
	    var layoutWorkDone = function () {
	    };
	    React.Children.forEach(this.props.children, function (children, index) {
	      children.props.layout(childrenPositionX, childrenPositionY, layoutWork);
	      if (index == cxt.props.children.length - 1) {
	        layoutWorkDone();
	      }
	    });
	  },
	  invalidate: function (obj) {
	    if (obj) {
	      obj['update'] = true;
	    } else {
	      obj = {update: true};
	    }
	    this.setState(obj);
	  }
	});

	module.exports = LinearLayout;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * 提供给开发者的接口
	 */

	var React = __webpack_require__(7);
	var Global = __webpack_require__(10);
	var bootstrap = __webpack_require__(12);

	var DeveloperTool = function () {
	  this.version = 0.1;
	};

	DeveloperTool.prototype.boot = function (list, documentNode) {
	  var processList = [];
	  for (var i = 0; i < list.length; i++) {
	    var id = list[i].props.id ? list[i].props.id : Global.getID();
	    list[i].props.action == 'main'
	      ?
	      processList.push({
	        action: 'main',
	        component: list[i],
	        id:id
	      })
	      :
	      processList.push({
	        action: null,
	        component: list[i],
	        id:id
	      })
	  }
	  bootstrap.init(processList);
	  bootstrap.start(documentNode);
	};

	DeveloperTool.prototype.debug = function(){
	  //console.log(Global.getPagePool());
	};

	module.exports = new DeveloperTool();


/***/ },
/* 6 */
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
	    x: 'auto',
	    y: 'auto'
	  };
	};

	View.prototype.LayoutParams = {
	  matchParent: -1,
	  wrapContent: -2
	};

	module.exports = new View();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/4/1.
	 */
	var UImixin = {
	  buildNodeTree: function (page, parent, id, component) {
	    page.addIdTreeNode(parent, id, component);
	    var cxt = this;
	    React.Children.forEach(component.props.children, function (children) {
	      children.props._page = page;
	      if (children.props._parent) {
	        children.props._parent['_id'] = id;
	        children.props._parent['cxt'] = cxt;
	      } else {
	        children.props._parent = {_id: id, cxt: cxt};
	      }
	    });
	  },
	  componentOperaInit: function () {
	    this.props.draw = this.draw;
	    this.props.layout = this.layout;
	    this.props.measure = this.measure;
	  }
	};

	module.exports = UImixin;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/4/8.
	 */
	var checkArea = __webpack_require__(10).util.checkArea;

	var UIListenerMixin = {
	  ListenerInit: function () {
	    this.props.listenerPool = {};
	  },
	  addListener: function (event, fun) {
	    this.props.listenerPool[event] = fun;
	  },
	  responseListener: function (event) {
	    if (this.props.listenerPool[event]) {
	      return this.props.listenerPool[event]();        //return true 向下及同级继续传递 false 立即停止传递
	    }
	  },
	  checkListener: function (event, x, y) {
	    var actual = this.state.actualStyle;
	    if (this.props.listenerPool[event] && checkArea(actual.x, actual.y, actual.width, actual.height, x, y)) {
	      return true;
	    }
	    return false;
	  }
	};

	module.exports = UIListenerMixin;



/***/ },
/* 10 */
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

	  this.getPagePool = function () {
	    return pagePool;
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
	  debug: false                               //是否开启调试模式
	};


	var util = {
	  clone: function (obj) {
	    //返回传递给他的任意对象的类
	    function isClass(o) {
	      if (o === null) return "Null";
	      if (o === undefined) return "Undefined";
	      return Object.prototype.toString.call(o).slice(8, -1);
	    }

	    var result, oClass = isClass(obj);
	    //确定result的类型
	    if (oClass === "Object") {
	      result = {};
	    } else if (oClass === "Array") {
	      result = [];
	    } else {
	      return obj;
	    }
	    for (key in obj) {
	      var copy = obj[key];
	      if (isClass(copy) == "Object") {
	        result[key] = arguments.callee(copy);//递归调用
	      } else if (isClass(copy) == "Array") {
	        result[key] = arguments.callee(copy);
	      } else {
	        result[key] = obj[key];
	      }
	    }
	    return result;
	  },
	  checkArea: function (x1, y1, width, height, x0, y0) {
	    var x2 = x1 + width;
	    var y2 = y1 + height;
	    if ((x0 > Math.min(x1, x2)) && (x0 < Math.max(x1, x2)) &&
	      (y0 > Math.min(y1, y2)) && (y0 < Math.max(y1, y2))) {
	      return true;
	    }
	    else {
	      return false;
	    }
	  }
	};

	Global.prototype.options = options;
	Global.prototype.util = util;

	module.exports = new Global();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/4/3.
	 */
	var Global = __webpack_require__(10);
	var View = __webpack_require__(6);

	var UIComponentMixin = {
	  getInitialState: function () {
	    this.props._id = this.props.id || Global.getID();
	    this.componentOperaInit();
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
	    (style.width != View.LayoutParams.matchParent && style.width != View.LayoutParams.wrapContent)
	    && (style.width *= Global.getBitX());
	    (style.height != View.LayoutParams.matchParent && style.height != View.LayoutParams.wrapContent)
	    && (style.height *= Global.getBitY());
	    (style.x != 'auto') && (style.x *= Global.getBitX());
	    (style.y != 'auto') && (style.y *= Global.getBitY());
	    return {
	      update: false,
	      style: style,
	      actualStyle: style
	    };
	  },
	  componentWillMount: function () {
	    this.buildNodeTree(this.props._page, this.props._parent._id, this.props._id, this);
	    this.ListenerInit();
	  },
	  shouldComponentUpdate: function (nextprops, nextstate) {
	    if (nextstate.update) {
	      var prevStyle = this.state.actualStyle;
	      Global.getContext().clearRect(prevStyle.x, prevStyle.y, prevStyle.width, prevStyle.height);
	    } else {
	      this.state = nextstate;
	      return false;
	    }
	    return true;
	  },
	  componentDidUpdate: function (prevProps, prevState) {
	    if (this.state.update) {
	      this.draw(Global.getContext());
	    }
	  },
	  render: function () {
	    return null;
	  },
	  layout: function (x, y, callback) {
	    var selfStyle = Global.util.clone(this.state.style);
	    selfStyle.x += x;
	    selfStyle.y += y;
	    this.state.actualStyle.x = selfStyle.x;
	    this.state.actualStyle.y = selfStyle.y;
	    if (callback) {
	      callback(this, {x: selfStyle.x, y: selfStyle.y, width: selfStyle.width, height: selfStyle.height});
	    }
	  },
	  invalidate: function (obj) {
	    obj['update'] = true;
	    this.setState(obj);
	  }
	};

	module.exports = UIComponentMixin;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * RubeCanvas启动器,封装成page,压栈运行
	 */

	var Page = __webpack_require__(13);
	var Global = __webpack_require__(10);

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
	    Global.addPageInPool(item.id, page);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/21.
	 * 界面管理器
	 */

	var React = __webpack_require__(7);
	var Global = __webpack_require__(10);
	var Tree = __webpack_require__(14);

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
	  this._node.props._page = this;
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
	  this._idTree.createList(null);
	};

	Page.prototype.getID = function () {
	  return this._id;
	};

	Page.prototype.addIdTreeNode = function (parent, id, component) {
	  this._idTree.addNode(parent, id, component);
	};

	Page.prototype.getIdTreeNode = function (id) {
	  return this._idTree.getNode(id);
	};

	Page.create = function (node) {
	  return new Page(node);
	};

	module.exports = Page;



/***/ },
/* 14 */
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
	  this._nodeList = [];              //BFS队列
	  this.addNode(-1, -1, null);       //终止节点
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
	  if (index != parentIndex) {
	    this._nodeMap[parentIndex].children.push(node);
	  }
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

	//use BFS
	Tree.prototype.createList = function (listIndex) {
	  var cxt = this;
	  if (listIndex != null) {
	    var node = this._nodeList[listIndex];
	  } else {
	    listIndex = -1;
	    var node = this.getNode(-1);
	  }
	  Array.prototype.forEach.call(node.children, function (childrenNode) {
	    cxt._nodeList.push(childrenNode);
	  });
	  if (listIndex == this._nodeList.length - 1) {
	    this._nodeList.reverse();
	    return;
	  } else {
	    this.createList(listIndex + 1);
	  }
	};

	Tree.prototype.iterationNode = function (func) {
	  var stopIterationNode = false;
	  Array.prototype.forEach.call(this._nodeList, function (node) {
	    if (!stopIterationNode) {
	      var re = func(node.value);
	      re || (stopIterationNode = true);
	    }
	  });
	};

	Tree.create = function () {
	  return new Tree();
	};

	module.exports = Tree;


/***/ }
/******/ ])