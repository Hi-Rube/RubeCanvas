var TextView = require('./TextView.js');
var UIWindow = require('./UIWindow.js');
var React = require('React');
var styles = {
		backgroundColor:'#ff0'
};
var props = { style:styles };
var props2 = {style:{width:20, height:20,x:30,y:30}}
React.render(React.createElement(UIWindow, React.__spread({},  props), React.createElement(TextView, React.__spread({},  props2))), document.body);

