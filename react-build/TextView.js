var React = require('React');
var Global = require('./Global');
var View = require('./View');

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