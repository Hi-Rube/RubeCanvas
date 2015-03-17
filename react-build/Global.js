/**
 * Created by Rube on 15/3/5.
 * 记录运行过程中所需要的参数变量和状态等
 */

var Global = function () {
  /**
   * 宽高的单位值,max=100,按比例分配
   */
  var wdpBit, hdpBit;
  /**
   * 设置比例
   * @param float w  实际宽
   * @param float h  实际高
   */
  this.setDp = function (w, h) {
    wdpBit = w / 100;
    hdpBit = h / 100;
  };

  /**
   * 根据比例得到实际值
   * @param float wdp  宽比例值
   * @param float hdp  高比例值
   * @returns object {{w: number, h: number}}  宽高实际值
   */
  this.getDp = function (wdp, hdp) {
    return {
      w: wdp * wdpBit,
      h: hdp * hdpBit
    }
  };

  var context = null;
  /** 设置上下文 **/
  this.setContext = function(cxt){
    context = cxt;
  };

  /** 获取上下文 **/
  this.getContext = function () {
    return context;
  };
};

/**
 * 全局配置信息
 * @type object
 */
var options = {
  debug: true                               //是否开启调试模式
};

Global.prototype.options = options;

module.exports = new Global();
