var TextView = require('./TextView.js');
var UIWindow = require('./UIWindow.js');
var React = require('React');
var styles = {
		backgroundColor:100
}
var props = { style:styles };
React.render(<UIWindow {...props} />, document.body);

