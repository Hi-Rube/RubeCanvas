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
    var actualStyle = this.state.actualStyle;
    var canvas = Global.getContext();
    if (selfStyle.width == View.LayoutParams.matchParent) {
      actualStyle.width = parentStyle.width;
    }
    if (selfStyle.height == View.LayoutParams.matchParent) {
      actualStyle.height = parentStyle.height;
    }
    var textLength = canvas.measureText(selfStyle.text);
    if (selfStyle.height == View.LayoutParams.wrapContent) {
      actualStyle.height = (textLength / selfStyle.fontSize * selfStyle.singleLineNumber + 1) * selfStyle.fontSize;
    }
    if (selfStyle.width == View.LayoutParams.wrapContent) {
      if (textLength <= selfStyle.singleLineNumber * selfStyle.fontSize) {
        actualStyle.width = textLength;
      } else {
        actualStyle.width = selfStyle.singleLineNumber * selfStyle.fontSize;
      }
    }
    callback(this, {width: actualStyle.width, height: actualStyle.height});
  }
});

module.exports = TextView;