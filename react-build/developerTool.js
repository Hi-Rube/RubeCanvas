/**
 * Created by Rube on 15/3/21.
 * 提供给开发者的接口
 */

var React = require('React');
var bootstrap = require('./bootstrap');

var DeveloperTool = function () {
  this.version = 0.1;
};

DeveloperTool.prototype.boot = function (list, documentNode) {
  var processList = [];
  for (var i = 0; i < list.length; i++) {
    list[i].props.action == 'main'
      ?
      processList.push({
        action: 'main',
        component: list[i]
      })
      :
      processList.push({
        action: null,
        component: list[i]
      })
  }
  bootstrap.init(processList);
  bootstrap.start(documentNode);
};

module.exports = new DeveloperTool();
