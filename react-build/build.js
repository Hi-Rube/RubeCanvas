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

	var TextView = __webpack_require__(2);
	var UIWindow = __webpack_require__(3);
	var View = __webpack_require__(4);
	var React = __webpack_require__(1);
	var styles = {
			backgroundColor:'#ff0'
	};
	var props = { style:styles };
	var props2 = {style:{width:View.LayoutParams.matchParent, height:View.LayoutParams.matchParent}}
	React.render(React.createElement(UIWindow, React.__spread({},  props), React.createElement(TextView, React.__spread({},  props2))), document.body);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Global = __webpack_require__(5);
	var View = __webpack_require__(4);

	var TextView = React.createClass({displayName: "TextView",
	  /** 控件默认属性值 **/
	  getDefaultProps: function () {
	    return {
	      defaultStyle: {
	        backgroundColor: '#fff',
	        fontSize: 10,
	        fontWeight: 2,
	        color: '#000',
	        text: '11'
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
	    var style = this.state.style;
	    cxt.fillStyle = style.backgroundColor;
	    cxt.fillRect(style.x, style.y, style.width, style.height);
	    cxt.fillStyle = style.color;
	    cxt.fillText(style.text, style.x + 100, style.y + 100, style.width);
	  },
	  measure: function (context, callback) {
	    var selfStyle = this.state.style;
	    var parentStyle = context.state.style;
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

	module.exports = TextView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var View = __webpack_require__(4);
	var Global = __webpack_require__(5);

	var TextView = __webpack_require__(2);

	/** 屏幕原始宽高获取 **/
	var w = window.innerWidth
	  || document.documentElement.clientWidth
	  || document.body.clientWidth;

	var h = window.innerHeight
	  || document.documentElement.clientHeight
	  || document.body.clientHeight;

	if (Global.options.debug) {
	  w = w > 600 ? 600 : w;
	}

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
	      cxt: null
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
	      Global.setDp(canvas.width * style.scaleRatio, canvas.height * style.scaleRatio);
	      context.setState({style: style});
	    })(canvas, cxt, this.state.style, this);
	  },
	  componentDidMount: function () {
	    var canvas = document.getElementById('main');
	    var cxt = canvas.getContext('2d');
	    var style = this.state.style;
	    var ratio = style.scaleRatio;
	    if (ratio != 1) {
	      canvas.width = w * ratio;
	      canvas.height = h * ratio;
	      style.width = canvas.width;
	      style.height = canvas.height;
	      cxt.scale(ratio, ratio);
	    }
	    Global.setContext(cxt);
	    this.setState({cxt: cxt, style: style});
	    this.measure();
	    this.draw(cxt, style);
	    React.Children.forEach(this.props.children, function (children) {
	      children.props.draw(cxt, style);
	    });
	  },
	  render: function () {
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rube on 15/3/5.
	 * 记录运行过程中所需要的参数变量和状态等
	 */

	var Global = function () {
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
	    wdpBit = w / 100;
	    hdpBit = h / 100;
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

	  var context = null;
	  /** 设置上下文 **/
	  this.setContext = function(cxt){
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


/***/ }
/******/ ])