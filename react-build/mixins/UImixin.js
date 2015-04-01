/**
 * Created by Rube on 15/4/1.
 */
var UImixin = {
  buildNodeTree: function (page, parent, id, component) {
    page.addIdTreeNode(parent, id, component);
    React.Children.forEach(component.props.children, function (children) {
      children.props._page = page;
      if (children.props._parent) {
        children.props._parent['_id'] = id;
      } else {
        children.props._parent = {_id: id};
      }
    });
  }
};

module.exports = UImixin;