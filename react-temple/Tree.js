/**
 * Created by Rube on 15/3/21.
 * 树型结构,用于构建page的id树等
 */

/**
 * Tree树型结构
 * _nodeStorage {object} 一个节点存储对象
 * _nodeMap {object} 一个节点引用存储对象,快速定位查找
 */
var Tree = function () {
  this._nodeMap = {};
  this._nodeList = [];              //BFS队列
  this.addNode(-1, -1, null);       //终止节点
};

/**
 * 添加节点
 * @param parentIndex {int} 父节点id值 (>=-1)
 * @param index {int} 当前节点id值 (>=-1)
 * @param value {*} 当前节点值
 */
Tree.prototype.addNode = function (parentIndex, index, value) {
  if (parentIndex < -1 || index < -1) {
    return new TypeError('parentIndex or index can not be lt -1');
  }
  var node = {parentIndex: parentIndex, index: index, value: value, children: []};
  this._nodeMap[index] = node;
  if (index != parentIndex) {
    this._nodeMap[parentIndex].children.push(node);
  }
};

/** 获取对应id的节点 **/
Tree.prototype.getNode = function (index) {
  return this._nodeMap[index];
};

/** 删除对应id的节点 **/
Tree.prototype.deleteNode = function (index) {
  var node = this._nodeMap[index];
  var parentNode = this._nodeMap[node.parentIndex];
  for (var i = 0; i < parentNode.children.length; i++) {
    if (parentNode.children[i].index === index) {
      Array.splice.call(parentNode.children, i, 1);
      break;
    }
  }
  delete this._nodeMap[index];
};

/** 更新节点信息 **/
Tree.prototype.updateNode = function (index, value) {
  this._nodeMap[index].value = value;
};

//use BFS
Tree.prototype.createList = function (listIndex) {
  var cxt = this;
  if (listIndex != null) {
    var node = this._nodeList[listIndex];
  } else {
    listIndex = -1;
    var node = this.getNode(-1);
  }
  Array.prototype.forEach.call(node.children, function (childrenNode) {
    cxt._nodeList.push(childrenNode);
  });
  if (listIndex == this._nodeList.length - 1) {
    this._nodeList.reverse();
    return;
  } else {
    this.createList(listIndex + 1);
  }
};

Tree.prototype.iterationNode = function (func) {
  var stopIterationNode = false;
  Array.prototype.forEach.call(this._nodeList, function (node) {
    if (!stopIterationNode) {
      var re = func(node.value);
      re || (stopIterationNode = true);
    }
  });
};

Tree.create = function () {
  return new Tree();
};

module.exports = Tree;
