/**
 * Created by Rube on 15/4/8.
 */
var UIListenerMixin = {
  ListenerInit: function () {
    this.props.listener = {};
    var listenerPool = this.props.listener;

    function checkArea(x1, y1, width, height, x0, y0) {
      var x2 = x1 + width;
      var y2 = y1 + height;
      if ((x0 > Math.min(x1, x2)) && (x0 < Math.max(x1, x2)) &&
        (y0 > Math.min(y1, y2)) && (y0 < Math.max(y1, y2))) {
        return true;
      }
      else {
        return false;
      }
    }

    this.props.addListener = function (event, fun) {
      listenerPool[event] = fun;
    };
    this.props.responseListener = function (event) {
      if (listenerPool[event]) {
        listenerPool[event]();
      }
    };
    this.props.checkListener = function (event, x, y) {
      var actual = this.state.actualStyle;
      if (listenerPool[event] && checkArea(actual.x, actual.y, actual.width, actual.height)) {
        return true;
      }
      return false;
    }
  }
};

module.exports = UIListenerMixin;

