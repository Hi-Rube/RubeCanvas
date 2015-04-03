var React = require('React');
var UImixin = require('./../mixins/UImixin');
var Global = require('./../Global');
var View = require('./../View');

var TextView = React.createClass({displayName: "TextView",
  mixins: [UImixin],
  /** 控件默认属性值 **/
  getDefaultProps: function () {
    return {
      defaultStyle: {
        backgroundColor: '#fff',
        fontSize: 20,
        fontWeight: 2,
        lineCount: null,
        singleLineNumber: 10,
        color: '#000',
        text: '是'
      }
    };
  },
  getInitialState: function () {
    this.props._id = Global.getID();
    this.componentOperaInit();
    View.init.call(this.props, null);
    var style = this.props.attrs;
    for (var s in this.props.defaultStyle) {
      style[s] = this.props.defaultStyle[s];
    }
    if (this.props.style) {
      for (var s in this.props.style) {
        style[s] = this.props.style[s];
      }
    }
    (style.width != View.LayoutParams.matchParent && style.width != View.LayoutParams.wrapContent)
    && (style.width *= Global.getBitX());
    (style.height != View.LayoutParams.matchParent && style.height != View.LayoutParams.wrapContent)
    && (style.height *= Global.getBitY());
    style.x *= Global.getBitX();
    style.y *= Global.getBitY();
    return {
      update: true,
      style: style,
      actualStyle: style
    };
  },
  componentWillMount: function () {
    this.buildNodeTree(this.props._page, this.props._parent._id, this.props._id, this);
  },
  shouldComponentUpdate: function (nextprops, nextstate) {
    if (nextstate.update) {
      this.draw(Global.getContext());
      return true;
    }
    return false;
  },
  render: function () {
    return null;
  },
  draw: function (cxt) {
    cxt.save();
    var style = this.state.actualStyle;
    cxt.fillStyle = style.backgroundColor;
    cxt.beginPath();
    cxt.rect(style.x, style.y, style.width, style.height);
    cxt.closePath();
    cxt.clip();
    cxt.fillRect(style.x, style.y, style.width, style.height);
    cxt.fillStyle = style.color;
    cxt.fillText(style.text, style.x, style.y + style.fontSize, style.width);
    cxt.restore();
  },
  measure: function (parent, callback) {
    var selfStyle = this.state.actualStyle;
    var parentStyle = parent.state.actualStyle;
    var canvas = Global.getContext();
    if (selfStyle.width == View.LayoutParams.matchParent) {
      selfStyle.width = parentStyle.width;
    }
    if (selfStyle.height == View.LayoutParams.matchParent) {
      selfStyle.height = parentStyle.height;
    }
    var textLength = canvas.measureText(selfStyle.text);
    if (selfStyle.height == View.LayoutParams.wrapContent) {
      selfStyle.height = (textLength / selfStyle.fontSize * selfStyle.singleLineNumber + 1) * selfStyle.fontSize;
    }
    if (selfStyle.width == View.LayoutParams.wrapContent) {
      if (textLength <= selfStyle.singleLineNumber * selfStyle.fontSize) {
        selfStyle.width = textLength;
      } else {
        selfStyle.width = selfStyle.singleLineNumber * selfStyle.fontSize;
      }
    }
    this.setState({actualStyle: selfStyle, update: false});
    callback(this, {width: selfStyle.width, height: selfStyle.height});
  },
  layout: function (x, y, width, height, callback) {
    var selfStyle = this.state.actualStyle;
    selfStyle.x += x;
    selfStyle.y += y;
    this.setState({actualStyle: selfStyle, update: false});
    if (callback) {
      callback(selfStyle.x, selfStyle.y);
    }
  }
});

module.exports = TextView;