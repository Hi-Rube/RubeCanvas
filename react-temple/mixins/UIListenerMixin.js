/**
 * Created by Rube on 15/4/8.
 */
var checkArea = require('./../Global').util.checkArea;

var UIListenerMixin = {
  ListenerInit: function () {
    this.props.listenerPool = {};
  },
  addListener: function (event, fun) {
    this.props.listenerPool[event] = fun;
  },
  responseListener: function (event) {
    if (this.props.listenerPool[event]) {
      return this.props.listenerPool[event]();        //return true 向下及同级继续传递 false 立即停止传递
    }
  },
  checkListener: function (event, x, y) {
    var actual = this.state.actualStyle;
    if (this.props.listenerPool[event] && checkArea(actual.x, actual.y, actual.width, actual.height, x, y)) {
      return true;
    }
    return false;
  }
};

module.exports = UIListenerMixin;

