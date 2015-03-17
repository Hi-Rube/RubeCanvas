var React = require('React');
var View = require('./View');
var Global = require('./Global');

var TextView = require('./TextView');

/** 屏幕原始宽高获取 **/
var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

if (Global.options.debug) {
  w = w > 600 ? 600 : w;
}

var bodyStyle = document.querySelectorAll('body')[0].style;
bodyStyle.border = 0;
bodyStyle.margin = 0;
bodyStyle.padding = 0;
bodyStyle.background = '#000';


var UIWindow = React.createClass({
  /** 控件默认属性值 **/
  getDefaultProps: function () {
    return {
      defaultStyle: {
        backgroundColor: '#fff'
      }
    };
  },
  /** 控件配置参数初始化 **/
  getInitialState: function () {
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
    return {
      style: style,
      cxt: null
    };
  },
  componentWillMount: function () {
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    /** 屏幕缩放计算 **/
    (function (canvas, ctx, style, context) {
      var devicePixelRatio = window.devicePixelRatio || 1;
      var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
      var ratio = devicePixelRatio / backingStorePixelRatio;
      style.scaleRatio = 1;
      if (devicePixelRatio !== backingStorePixelRatio) {
        style.scaleRatio = ratio;
      }
      Global.setDp(canvas.width * style.scaleRatio, canvas.height * style.scaleRatio);
      context.setState({style: style});
    })(canvas, cxt, this.state.style, this);
  },
  componentDidMount: function () {
    var canvas = document.getElementById('main');
    var cxt = canvas.getContext('2d');
    var style = this.state.style;
    var ratio = style.scaleRatio;
    if (ratio != 1) {
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      style.width = canvas.width;
      style.height = canvas.height;
      cxt.scale(ratio, ratio);
    }
    Global.setContext(cxt);
    this.setState({cxt: cxt, style: style});
    this.measure();
    this.draw(cxt, style);
    React.Children.forEach(this.props.children, function (children) {
      children.props.draw(cxt, style);
    });
  },
  render: function () {
    var style = this.state.style;
    return (<canvas id='main' style={{
      width: w,
      height: h,
      backgroundColor: style.backgroundColor
    }} >{this.props.children}</canvas>);
  },
  /** 控件绘制 **/
  draw: function (cxt, attrs) {

  },
  /** 控件布局 **/
  layout: function () {

  },
  /** 控件布局计算 **/
  measure: function () {
    var cxt = this;
    var measureWork = function (params) {
      cxt.layout();
    };
    React.Children.forEach(this.props.children, function (children) {
      children.props.measure(cxt, measureWork);
    });
  }
});

module.exports = UIWindow;