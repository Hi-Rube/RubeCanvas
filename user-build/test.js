/**
 * Created by Rube on 15/3/21.
 */
Window.RCInit(this);
var TextView = RC.UI.TextView;
var ImageView = RC.UI.ImageView;
var UIWindow = RC.UI.Window;
var LinearLayout = RC.UI.LinearLayout;

var LayoutParams = RC.Params.Layout;

var styles = {
  backgroundColor: '#ff0'
};
var props = {id: 'window', style: styles, action: 'main'};
var props2 = {id: 'cui', style: {width: 30, x: 30, y: 20, backgroundColor: '#fff'}};
var props3 = {id: 'text1', style: {width: LayoutParams.matchParent, height: 10, x: 10, y: 5, backgroundColor: '#000'}};
var props4 = {id: 'text2', style: {width: LayoutParams.matchParent, height: 10, x: 10, y: 25, backgroundColor: '#f0a'}};
var props6 = {style: {width: LayoutParams.matchParent, x: 1, y: 10}};
var props7 = {style: {width: LayoutParams.matchParent, x: 2, y: 20}};
var props8 = {style: {width: 30, height: 90, x: 30, y: 20, backgroundColor: '#000'}};
var props9 = {style: {width: 50, height: 20, x: 0, y: 50, backgroundColor: '#0f9'}};
var page1 =
  React.createElement(UIWindow, React.__spread({},  props), 
    React.createElement(ImageView, React.__spread({},  props2)), 
    React.createElement(TextView, React.__spread({},  props3)), 
    React.createElement(TextView, React.__spread({},  props4))
  );
RC.Dev.boot([page1]);
RC.Dev.debug();

page1.props._page.getIdTreeNode('cui').value.addListener('touchstart', function () {
  alert(1);
});