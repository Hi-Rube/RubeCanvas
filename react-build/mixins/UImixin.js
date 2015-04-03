/**
 * Created by Rube on 15/4/1.
 */
var UImixin = {
  buildNodeTree: function (page, parent, id, component) {
    page.addIdTreeNode(parent, id, component);
    var cxt = this;
    React.Children.forEach(component.props.children, function (children) {
      children.props._page = page;
      if (children.props._parent) {
        children.props._parent['_id'] = id;
        children.props._parent['cxt'] = cxt;
      } else {
        children.props._parent = {_id: id, cxt: cxt};
      }
    });
  },
  componentOperaInit: function () {
    this.props.draw = this.draw;
    this.props.layout = this.layout;
    this.props.measure = this.measure;
  }
};

module.exports = UImixin;