/**
 * Created by Rube on 15/3/21.
 */
Window.RCInit(this);
var TextView = RC.UI.TextView;
var UIWindow = RC.UI.Window;

var styles = {
  backgroundColor:'#ff0'
};
var props = { style:styles, action:'main' };
var props2 = {style:{width:10, height:20}};
var props3 = {style:{width:10, height:20, x:10, y:90, backgroundColor:'#0ff'}};
var page1 = React.createElement(UIWindow, React.__spread({},  props), React.createElement(TextView, React.__spread({},  props2)), React.createElement(TextView, React.__spread({},  props3)));

RC.Dev.boot([page1]);