/**
 * Created by Rube on 15/3/21.
 * 界面管理器
 */

var React = require('React');
var Global = require('./Global');
var Tree = require('./Tree');

/**
 * 界面管理器
 * [node] {object} 页面UI挂载的根节点
 * _node {object} 页面UI挂载的根节点
 * _id {int} 页面id
 * _documentNode {DOM} HTML页面上DOM挂载点
 * _idTree {object} 界面组件id树
 */
var Page = function (node) {
  this._node = node ? node : null;
  this._id = Global.getID();
  this._documentNode = null;
  this._idTree = Tree.create();
};

/**
 * 挂载页面UI根节点
 * @param documentNode {DOM} HTML页面上DOM挂载点
 * @param [node] {object} 页面UI根节点
 */
Page.prototype.mountNode = function (documentNode, node) {
  this._documentNode = documentNode;
  if (node) {
    this._node = node;
  }
  React.render(this._node, documentNode);
};

Page.create = function (node) {
  return new Page(node);
};

module.exports = Page;

