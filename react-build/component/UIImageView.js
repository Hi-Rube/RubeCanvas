/**
 * Created by Rube on 15/4/3.
 */
var React = require('React');
var UImixin = require('./../mixins/UImixin');
var UIComponentMixin = require('./../mixins/UIComponentMixin');
var Global = require('./../Global');
var View = require('./../View');

var ImageView = React.createClass({displayName: "ImageView",
  mixins: [UImixin, UIComponentMixin],
  /** 控件默认属性值 **/
  getDefaultProps: function () {
    return {
      defaultStyle: {
        image: new Image(),
        backgroundColor: '#fff',
        color: '#000',
        src: './static/photo.jpg'
      }
    };
  },
  draw: function (cxt) {
    var context = this;
    cxt.save();
    var style = this.state.actualStyle;
    console.log(style)
    var selfStyle = this.state.style;
    cxt.fillStyle = style.backgroundColor;
    cxt.beginPath();
    cxt.rect(style.x, style.y, style.width, style.height);
    cxt.closePath();
    cxt.clip();
    cxt.fillRect(style.x, style.y, style.width, style.height);
    if (style.image.src) {
      cxt.drawImage(style.image, 0, 0, style.image.width, style.image.height, style.x, style.y, style.width, style.height);
    } else {
      style.image.src = style.src;
      style.image.onload = function () {
        var flag = false;
        if (selfStyle.width == View.LayoutParams.wrapContent) {
          style.width = style.image.width;
          flag = true;
        }
        if (selfStyle.height == View.LayoutParams.wrapContent) {
          style.height = style.image.height;
          flag = true;
        }
        if (flag) {
          return context.setState({actualStyle: style, update: true});
        }
        cxt.drawImage(style.image, 0, 0, style.image.width, style.image.height, style.x, style.y, style.width, style.height);
      };
    }
    cxt.restore();
  },
  measure: function (parent, callback) {
    var selfStyle = Global.util.clone(this.state.style);
    var parentStyle = parent.state.style;
    if (selfStyle.width == View.LayoutParams.matchParent) {
      selfStyle.width = parentStyle.width;
    }
    if (selfStyle.height == View.LayoutParams.matchParent) {
      selfStyle.height = parentStyle.height;
    }
    this.setState({actualStyle: selfStyle, update: false});
    callback(this, {width: selfStyle.width, height: selfStyle.height});
  },
  layout: function (x, y, callback) {
    var selfStyle = Global.util.clone(this.state.style);
    selfStyle.x += x;
    selfStyle.y += y;
    this.setState({actualStyle: selfStyle, update: false});
    if (callback) {
      callback(this, {x: selfStyle.x, y: selfStyle.y, width: selfStyle.width, height: selfStyle.height});
    }
  }
});

module.exports = ImageView;
