/**
 * Created by Rube on 15/3/21.
 * RubeCanvas启动器,封装成page,压栈运行
 */

var Page = require('./Page');
var Global = require('./Global');

/**
 * pageList {array} page列表,在内存中
 * mainPage {object} 启动项page
 */
var bootstrap = function () {
  this.mainPage = null;
};

/**
 * 程序初始化开始
 * @param list
 */
bootstrap.prototype.start = function (list) {
  (function (cxt) {
    Array.forEach.call(list, function (item) {
      var action = item.action;
      var component = item.component;
      var page = Page.create(component);
      this.pageList.push(page);
      if (action === 'main') {
        cxt.mainPage = page;
      }
    });
  })(this)
};





