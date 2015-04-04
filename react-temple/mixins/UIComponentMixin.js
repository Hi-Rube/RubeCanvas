/**
 * Created by Rube on 15/4/3.
 */
var Global = require('./../Global');
var View = require('./../View');

var UIComponentMixin = {
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
    (style.x != 'auto') && (style.x *= Global.getBitX());
    (style.y != 'auto') && (style.y *= Global.getBitY());
    return {
      update: false,
      style: style,
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
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.update) {
      this.draw(Global.getContext());
    }
  },
  render: function () {
    return null;
  }
};

module.exports = UIComponentMixin;