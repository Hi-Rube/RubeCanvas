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
	var React = __webpack_require__(1);
	var styles = {
			backgroundColor:100
	}
	var props = { style:styles };
	React.render(React.createElement(UIWindow, React.__spread({},  props)), document.body);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var View = __webpack_require__(4);
	var TextView = React.createClass({displayName: "TextView",
		getInitialState: function() {
			View.init.call(this.props, null);
			if (this.props.style) {
				var style = this.props.style;
				for (var attr in this.props.attrs) {
					style[attr] && (this.props.attrs[attr] = style[attr]);
					delete style[attr];
				}
			}
			return {
				go: 'fuck23'
			};
		},
		change: function() {
			React.Children.forEach(this.props.children, function(item) {
				console.log(item);
			});
		},
		render: function() {
			return (React.createElement("div", null, " ", 
							this.props.foo, 
						" "));
		}
	});

	module.exports = TextView;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var View = __webpack_require__(4);
	var w = window.innerWidth
	  || document.documentElement.clientWidth
	  || document.body.clientWidth;

	var h = window.innerHeight
	  || document.documentElement.clientHeight
	  || document.body.clientHeight;

	var UIWindow = React.createClass({displayName: "UIWindow",
	  getDefaultProps:function(){
	    return{defaultStyle:{
	      backgroundColor:'#000'
	    }};
	  },
	  getInitialState: function () {
	    View.init.call(this.props, null);
	    if (this.props.style) {
	      var style = this.props.style;
	      var defaultStyle = this.props.defaultStyle;
	      for (var attr in this.props.attrs) {
	        style[attr] && (this.props.attrs[attr] = style[attr]) ||
	        defaultStyle[attr] && (this.props.attrs[attr] = defaultStyle[attr]);
	        delete style[attr];
	      }
	    }
	    return{};
	  },
	  componentWillMount: function(){
	  },
	  componentDidMount:function(){
	  },
	  render: function () {
	    return (React.createElement("canvas", {id: "main", style: {width: w, height: h}}));
	  },
	  draw:function(){

	  },
	  layout:function(){

	  },
	  measure:function(){

	  }
	});

	module.exports = UIWindow;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var View = function() {
	};

	View.prototype.init = function() {
		this.LayoutParams = {
			matchParent: -1,
			wrapContent: -2
		};
		this.attrs = {
			width: this.LayoutParams.wrapContent,
			height: this.LayoutParams.wrapContent,
			paddingTop: null,
			paddingRight: null,
			paddingBottom: null,
			paddingLeft: null,
			padding: [null, null, null, null],
			marginTop: null,
			marginRight: null,
			marginBottom: null,
			marginLeft: null,
			margin: [null, null, null, null],
			borderTop: [null, null],
			borderRight: [null, null],
			borderBottom: [null, null],
			borderLeft: [null, null],
			border: [null, null],
			backgroundColor: null
		};
	};

	module.exports = new View();

/***/ }
/******/ ])