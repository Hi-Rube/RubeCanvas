var React = require('React');
var View = require('./../View');
var UImixin = require('./../mixins/UImixin');
var Global = require('./../Global');

/** 屏幕原始宽高获取 **/
var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

if (Global.options.debug) {
  w = w > 400 ? 400 : w;
}
Global.setDp(w, h);

var bodyStyle = document.querySelectorAll('body')[0].style;
bodyStyle.border = 0;
bodyStyle.margin = 0;
bodyStyle.padding = 0;
bodyStyle.background = '#000';

var UIWindow = React.createClass({
  mixins: [UImixin],
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
    return {
      style: style,
      actualStyle: style,
      update: false,
      touchPosition: {
        nowX: null,
        nowY: null,
        startX: null,
        startY: null
      }
    };
  },
  componentWillMount: function () {
    this.buildNodeTree(this.props._page, -1, this.props._id, this);
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
    })(canvas, cxt, this.state.style, this);
  },
  componentDidMount: function () {
    var canvas = document.getElementById('main');
    var context = this;
    var cxt = canvas.getContext('2d');
    var style = this.state.style;
    var ratio = style.scaleRatio;

    canvas.width = w * ratio;
    canvas.height = h * ratio;
    cxt.scale(ratio, ratio);

    style.width = canvas.width;
    style.height = canvas.height;
    Global.setContext(cxt);
    this.invalidate({actualStyle: style});
    canvas.addEventListener('touchstart', function (event) {
      event.preventDefault();
      var touch = event.touches[0];
      var touchPosition = context.state.touchPosition;
      touchPosition['startX'] = touch.pageX;
      touchPosition['startY'] = touch.pageY;
      touchPosition['nowX'] = touch.pageX;
      touchPosition['nowY'] = touch.pageY;
      context.setState({touchPosition: touchPosition, update: true});
    });
  },
  shouldComponentUpdate: function (nextprops, nextstate) {
    if (nextstate.update) {
      var prevStyle = this.state.actualStyle;
      if (Global.getContext()) {
        Global.getContext().clearRect(prevStyle.x, prevStyle.y, prevStyle.width, prevStyle.height);
      }
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
    var style = this.state.actualStyle;
    return (
      <canvas id='main' style={{
        width: w,
        height: h,
        backgroundColor: style.backgroundColor
      }} >{this.props.children}
      </canvas>
    );
  },
  /** 控件绘制 **/
  draw: function (cxt) {
    React.Children.forEach(this.props.children, function (children) {
      children.props.draw(cxt);
    });
  },
  /** 控件布局 **/
  layout: function () {
    var cxt = this;
    var style = this.state.actualStyle;
    var layoutWork = function (children, childrenParams) {

    };
    var layoutWorkDone = function () {

    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.layout(0, 0, layoutWork);
      if (index == cxt.props.children.length - 1) {
        layoutWorkDone();
      }
    });
  },
  /** 控件布局计算 **/
  measure: function () {
    var cxt = this;
    var measureWork = function (children, childrenParams) {
    };
    var measureWorkDone = function () {
    };
    React.Children.forEach(this.props.children, function (children, index) {
      children.props.measure(cxt, measureWork);
      if (index == cxt.props.children.length - 1) {
        measureWorkDone();
      }
    });
  },
  invalidate: function (obj) {
    obj['update'] = true;
    this.setState(obj);
  }
});

module.exports = UIWindow;