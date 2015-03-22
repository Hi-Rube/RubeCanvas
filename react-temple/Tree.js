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
  this.addNode(-1, -1, null);       //根节点
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
  this._nodeMap[parentIndex].children.push(node);
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

Tree.create = function () {
  return new Tree();
};

module.exports = Tree;
