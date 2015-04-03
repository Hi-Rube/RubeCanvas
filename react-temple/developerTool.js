/**
 * Created by Rube on 15/3/21.
 * 提供给开发者的接口
 */

var React = require('React');
var Global = require('./Global');
var bootstrap = require('./bootstrap');

var DeveloperTool = function () {
  this.version = 0.1;
};

DeveloperTool.prototype.boot = function (list, documentNode) {
  var processList = [];
  for (var i = 0; i < list.length; i++) {
    var id = list[i].props.id ? list[i].props.id : Global.getID();
    list[i].props.action == 'main'
      ?
      processList.push({
        action: 'main',
        component: list[i],
        id:id
      })
      :
      processList.push({
        action: null,
        component: list[i],
        id:id
      })
  }
  bootstrap.init(processList);
  bootstrap.start(documentNode);
};

DeveloperTool.prototype.debug = function(){
  //console.log(Global.getPagePool());
};

module.exports = new DeveloperTool();
