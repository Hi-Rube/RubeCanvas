/**
 * Created by Rube on 15/3/21.
 * RubeCanvas启动器,封装成page,压栈运行
 */

var Page = require('./Page');
var Global = require('./Global');

/**
 * mainPage {object} 启动项page
 */
var Bootstrap = function () {
  this.mainPage = null;
};

/**
 * 程序初始化开始
 * @param list
 */
Bootstrap.prototype.init = function (list) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var action = item.action;
    var component = item.component;
    var page = Page.create(component);
    Global.addPageInPool(page.getID(), page);
    if (action === 'main') {
      this.mainPage = page;
    }
  }
};

Bootstrap.prototype.start = function (documentNode) {
  if (documentNode) {
    this.mainPage.mountNode(documentNode);
  } else {
    this.mainPage.mountNode(document.body);         //default mount on <body>
  }
  Global.pushPageInStack(this.mainPage);
};

module.exports = new Bootstrap();





