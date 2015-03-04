var React = require('React');
var View = require('./View');
var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

var UIWindow = React.createClass({
  getDefaultProps:function(){
    return{defaultStyle:{
      backgroundColor:'#000'
    }};
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
    return{};
  },
  componentWillMount: function(){
  },
  componentDidMount:function(){
  },
  render: function () {
    return (<canvas id='main' style={{width: w, height: h}} />);
  },
  draw:function(){

  },
  layout:function(){

  },
  measure:function(){

  }
});

module.exports = UIWindow;