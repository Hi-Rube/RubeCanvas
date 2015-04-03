/**
 * Created by Rube on 15/3/23.
 */

var React = require('React');
var UImixin = require('./../mixins/UImixin');
var Global = require('./../Global');
var View = require('./../View');

var LinearLayout = React.createClass({displayName: "LinearLayout",
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
    (style.x != 'auto') && (style.x *= Global.getBitX());
    (style.y != 'auto') && (style.y *= Global.getBitY());
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
      var prevStyle = this.state.actualStyle;
      Global.getContext().clearRect(prevStyle.x, prevStyle.y, prevStyle.width, prevStyle.height);
    }
    return true;
  },
  componentDidUpdate: function (prevprops, prevstate) {
    if (this.state.update) {
      this.measure();
      this.layout();
      this.draw(Global.getContext());
    }
  },
  render: function () {
    return React.createElement('LinearLayout', null, this.props.children);
  },
  draw: function (cxt) {
    React.Children.forEach(this.props.children, function (children) {
      children.props.draw(cxt);
    });
  },
  measure: function (parent, callback) {
    var cxt = this;
    var staticStyle = cxt.state.style;
    var runtimeStyle = cxt.state.style;
    var parentStyle = parent.state.style;
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
      cxt.setState({actualStyle: runtimeStyle, style: runtimeStyle, update: false});
      callback(cxt, {width: runtimeStyle.width, height: runtimeStyle.height});
    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.measure(cxt, measureWork);
      if (index == cxt.props.children.length - 1) {
        measureWorkDone();
      }
    });
  },
  layout: function (x, y, callback) {
    var cxt = this;
    var selfStyle = Global.util.clone(this.state.style);
    selfStyle.x += x;
    selfStyle.y += y;
    this.setState({actualStyle: selfStyle, update: false});
    var childrenPositionX = selfStyle.x;
    var childrenPositionY = selfStyle.y;
    var layoutWork = function (children, childrenParams) {
    };
    var layoutWorkDone = function () {
    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.layout(childrenPositionX, childrenPositionY, layoutWork);
      if (index == cxt.props.children.length - 1) {
        layoutWorkDone();
      }
    });
  }
});

module.exports = LinearLayout;