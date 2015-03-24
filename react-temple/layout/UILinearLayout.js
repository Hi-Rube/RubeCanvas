/**
 * Created by Rube on 15/3/23.
 */

var React = require('React');
var Global = require('./../Global');
var View = require('./../View');

var LinearLayout = React.createClass({
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
      actualStyle: null
    };
  },
  render: function () {
    if (Global.getContext()) {
      this.draw();
    }
    return React.createElement('LinearLayout', null, this.props.children);
  },
  draw: function () {

  },
  measure: function (parent, callback) {
    var cxt = this;
    var staticStyle = cxt.props.attrs;
    var runtimeStyle = cxt.state.style;
    var parentStyle = parent.state.style;
    var measureWork = function (children, chilrenParams) {
      if (chilrenParams.height > runtimeStyle.height || staticStyle.height == View.LayoutParams.wrapContent) {
        runtimeStyle.height = chilrenParams.height;
      }
      if (staticStyle.width == View.LayoutParams.wrapContent) {
        if (runtimeStyle.width == View.LayoutParams.wrapContent) {
          runtimeStyle.width = chilrenParams.width;
        } else {
          runtimeStyle.width += chilrenParams.width;
        }
        runtimeStyle.width = runtimeStyle.width > parentStyle.width ? parentStyle.width : runtimeStyle.width;
      }
    };
    var measureWorkDone = function () {
      cxt.setState({style:runtimeStyle});
    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.measure(cxt, measureWork);
      if (index == cxt.props.children.length - 1) {
        measureWorkDone();
      }
    });
  },
  layout: function () {

  }
});

module.exports = LinearLayout;