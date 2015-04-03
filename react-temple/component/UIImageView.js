/**
 * Created by Rube on 15/4/3.
 */
var React = require('React');
var UImixin = require('./../mixins/UImixin');
var UIComponentMixin = require('./../mixins/UIComponentMixin');
var Global = require('./../Global');
var View = require('./../View');

var ImageView = React.createClass({
  mixins: [UImixin, UIComponentMixin],
  /** 控件默认属性值 **/
  getDefaultProps: function () {
    return {
      defaultStyle: {
        image: '',
        backgroundColor: '#fff',
        color: '#000',
        src: './static/photo.jpg'
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
    style.image.src = style.src;
    style.image.onload = function () {
      cxt.drawImage(style.image, 0, 0, style.image.width, style.image.height, style.x, style.y, style.width, style.height);
    };
    cxt.restore();
  },
  measure: function (parent, callback) {
    var selfStyle = this.state.style;
    var parentStyle = parent.state.style;
    var canvas = Global.getContext();
    var image = new Image();
    selfStyle.image = image;
    if (selfStyle.width == View.LayoutParams.matchParent) {
      selfStyle.width = parentStyle.width;
    }
    if (selfStyle.height == View.LayoutParams.matchParent) {
      selfStyle.height = parentStyle.height;
    }
    var textLength = canvas.measureText(selfStyle.text);
    if (selfStyle.height == View.LayoutParams.wrapContent) {
    }
    if (selfStyle.width == View.LayoutParams.wrapContent) {
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
      callback(this, {x: selfStyle.x, y: selfStyle.y, width: selfStyle.width, height: selfStyle.height});
    }
  }
});

module.exports = ImageView;
