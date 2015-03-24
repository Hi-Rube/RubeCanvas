var View = function () {
};

/**
 * View属性加载
 */
View.prototype.init = function () {
  /** 适应父级布局和适应内容布局 **/
  this.LayoutParams = {
    matchParent: -1,
    wrapContent: -2
  };
  /** View基本属性 **/
  this.attrs = {
    width: this.LayoutParams.wrapContent,
    height: this.LayoutParams.wrapContent,
    backgroundColor: '#fff',
    x: 0,
    y: 0
  };
};

View.prototype.LayoutParams = {
  matchParent: -1,
  wrapContent: -2
};

module.exports = new View();