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
          context.invalidate({actualStyle: style});
        }
      };
    }
    cxt.restore();
  },
  measure: function (parent, callback) {
    var selfStyle = Global.util.clone(this.state.style);
    var actualStyle = this.state.actualStyle;
    var parentStyle = parent.state.style;
    if (selfStyle.width == View.LayoutParams.matchParent) {
      actualStyle.width = parentStyle.width;
    }
    if (selfStyle.height == View.LayoutParams.matchParent) {
      actualStyle.height = parentStyle.height;
    }
    callback(this, {width: actualStyle.width, height: actualStyle.height});
  }
});

module.exports = ImageView;
