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

	/*var TextView = require('./TextView.js');
	var UIWindow = require('./UIWindow.js');
	var View = require('./View');
	var React = require('React');
	var Page = require('./Page');
	var styles = {
			backgroundColor:'#ff0'
	};
	var props = { style:styles };
	var props2 = {style:{width:View.LayoutParams.matchParent, height:20}};
	var props3 = {style:{width:View.LayoutParams.matchParent, height:20, x:10, y:90, backgroundColor:'#0ff'}};
	React.render(<UIWindow {...props} ><TextView {...props2}/><TextView {...props3}/></UIWindow>, document.body);

	var a = Page.create();
	var b = Page.create();

	console.log(a._id +''+ b._id);*/

/***/ }
/******/ ])