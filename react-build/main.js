var TextView = require('./TextView.js');
var UIWindow = require('./UIWindow.js');
var View = require('./View');
var React = require('React');
var styles = {
		backgroundColor:'#ff0'
};
var props = { style:styles };
var props2 = {style:{width:View.LayoutParams.matchParent, height:View.LayoutParams.matchParent}}
React.render(React.createElement(UIWindow, React.__spread({},  props), React.createElement(TextView, React.__spread({},  props2))), document.body);

