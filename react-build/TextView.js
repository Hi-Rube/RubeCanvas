var React = require('React');
var View = require('./View');
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