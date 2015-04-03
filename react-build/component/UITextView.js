var React = require('React');
var UImixin = require('./../mixins/UImixin');
var UIComponentMixin = require('./../mixins/UIComponentMixin');
var Global = require('./../Global');
var View = require('./../View');

var TextView = React.createClass({displayName: "TextView",
  mixins: [UImixin, UIComponentMixin],
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
    var selfStyle = this.state.style;
    var parentStyle = parent.state.style;
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
    this.setState({actualStyle: selfStyle, style: selfStyle, update: false});
    callback(this, {width: selfStyle.width, height: selfStyle.height});
  },
  layout: function (x, y, callback) {
    var selfStyle = this.state.style;
    selfStyle.x += x;
    selfStyle.y += y;
    this.setState({actualStyle: selfStyle, update: false}, function () {
      selfStyle.x -= x;
      selfStyle.y -= y;
    });
    if (callback) {
      callback(selfStyle.x, selfStyle.y, selfStyle.width, selfStyle.height);
    }
  }
});

module.exports = TextView;