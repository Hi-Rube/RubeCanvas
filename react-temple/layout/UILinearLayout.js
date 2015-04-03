/**
 * Created by Rube on 15/3/23.
 */

var React = require('React');
var UImixin = require('./../mixins/UImixin');
var Global = require('./../Global');
var View = require('./../View');

var LinearLayout = React.createClass({
  mixins: [UImixin],
  getInitialState: function () {
    this.props._id = Global.getID();
    this.componentOperaInit();
    View.init.call(this.props, null);
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
      update: true,
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
    return React.createElement('LinearLayout', null, this.props.children);
  },
  draw: function (cxt) {
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.draw(cxt);
    });
  },
  measure: function (parent, callback) {
    var cxt = this;
    var staticStyle = cxt.props.attrs;
    var runtimeStyle = cxt.state.actualStyle;
    var parentStyle = parent.state.actualStyle;
    var measureWork = function (children, childrenParams) {
      if (childrenParams.height > runtimeStyle.height || staticStyle.height == View.LayoutParams.wrapContent) {
        runtimeStyle.height = childrenParams.height;
      }
      if (staticStyle.width == View.LayoutParams.wrapContent) {
        if (runtimeStyle.width == View.LayoutParams.wrapContent) {
          runtimeStyle.width = childrenParams.width;
        } else {
          runtimeStyle.width += childrenParams.width;
        }
        runtimeStyle.width = runtimeStyle.width > parentStyle.width ? parentStyle.width : runtimeStyle.width;
      }
    };
    var measureWorkDone = function () {
      cxt.setState({actualStyle: runtimeStyle, update: false});
      callback();
    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.measure(cxt, measureWork);
      if (index == cxt.props.children.length - 1) {
        measureWorkDone();
      }
    });
  },
  layout: function (x, y, width, height) {
    var selfStyle = this.state.actualStyle;
    selfStyle.x += x;
    selfStyle.y += y;
    this.setState({actualStyle: selfStyle, update: false});
    React.Children.forEach(this.props.children, function (children) {
      children.props.layout(selfStyle.x, selfStyle.y, width, height);
    });
  }
});

module.exports = LinearLayout;