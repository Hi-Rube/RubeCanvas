var TextView = require('./TextView.js');
var UIWindow = require('./UIWindow.js');
var View = require('./View');
var React = require('React');
var styles = {
		backgroundColor:'#ff0'
};
var props = { style:styles };
var props2 = {style:{width:View.LayoutParams.matchParent, height:View.LayoutParams.matchParent}}
React.render(<UIWindow {...props} ><TextView {...props2}/></UIWindow>, document.body);

