/**
 * Created by Rube on 15/3/23.
 */

var React = require('React');
var View = require('./../View');

var LinearLayout = React.createClass({displayName: "LinearLayout",
  getInitialState: function () {
    View.init.call(this.props, null);
    this.props.draw = this.draw;
    this.props.measure = this.measure;
    this.props.layout = this.layout;
    var style = this.props.attrs;
    if (this.props.defaultStyle) {
      for (var s in this.props.defaultStyle) {
        style[s] = this.props.defaultStyle[s];
      }
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
      style: style,
      cxt: null
    };
  },
  render: function () {
    return null;
  },
  draw: function () {

  },
  measure: function () {
    var cxt = this;
    var measureWork = function (params) {
      cxt.layout();
    };
    React.Children.forEach(this.props.children, function (children) {
      children.props.measure(cxt, measureWork);
    });
  },
  layout: function () {

  }
});

module.exports = LinearLayout;