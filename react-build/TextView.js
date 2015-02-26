var React = require('react');

var TextView = React.createClass({displayName: "TextView",
	render:function(){
		return (React.createElement("div", null, "hel的lo world"));
	}
});

module.exports = TextView;