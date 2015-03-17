var TextView = require('./TextView.js');
var UIWindow = require('./UIWindow.js');
var React = require('React');
var styles = {
		backgroundColor:'#ff0'
};
var props = { style:styles };
var props2 = {style:{width:20, height:20,x:30,y:30}}
React.render(<UIWindow {...props} ><TextView {...props2}/></UIWindow>, document.body);

