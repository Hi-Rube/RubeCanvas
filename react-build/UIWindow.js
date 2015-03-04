var React = require('React');
var View = require('./View');
var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

var UIWindow = React.createClass({displayName: "UIWindow",
  getDefaultProps: function () {
    return {
      defaultStyle: {
        backgroundColor: '#000'
      }
    };
  },
  getInitialState: function () {
    View.init.call(this.props, null);
    if (this.props.style) {
      var style = this.props.style;
      var defaultStyle = this.props.defaultStyle;
      for (var attr in this.props.attrs) {
        style[attr] && (this.props.attrs[attr] = style[attr]) ||
        defaultStyle[attr] && (this.props.attrs[attr] = defaultStyle[attr]);
        delete style[attr];
      }
    }
    return {};
  },
  componentWillMount: function () {
  },
  componentDidMount: function () {
    var canvas = document.getElementById('main');
    var cxt = canvas.getContext('2d');
    this.props.cxt = cxt;
    (function (canvas, ctx) {
      var devicePixelRatio = window.devicePixelRatio || 1;
      var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

      var ratio = devicePixelRatio / backingStorePixelRatio;

      if (devicePixelRatio !== backingStorePixelRatio) {
        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        ctx.scale(ratio, ratio);
      }

    })(canvas, cxt);
    this.draw(this.props.cxt);
  },
  render: function () {
    return (React.createElement("canvas", {id: "main", style: {width: 420, height: 247}}));
  },
  draw: function (cxt) {
    var img = new Image();
    img.src = "http://lorempixel.com/360/420/cats/6/";
    //img.src='/static/photo.jpg';
    img.onload = function () {
      cxt.drawImage(img, 0, 0, 360, 420, 0, 0, 144, 168);
    }
  },
  layout: function () {

  },
  measure: function () {

  }
});

module.exports = UIWindow;