/**
 * Created by Rube on 15/3/21.
 */
Window.RCInit(this);
var TextView = RC.UI.TextView;
var UIWindow = RC.UI.Window;
var LinearLayout = RC.UI.LinearLayout;

var LayoutParams = RC.Params.Layout;

var styles = {
  backgroundColor: '#ff0'
};
var props = {style: styles, action: 'main'};
var props2 = {style: {width: 50, height: 20, x: 30, y: 0}};
var props3 = {style: {width: 50, height: 20, x: 0, y: 0, backgroundColor: '#0ff'}};
var props4 = {style: {width: 20, height: 20, x: 30, y: 60, backgroundColor: '#f0f'}};
var props5 = {style: {width: 30, height: 20, x: 0, y: 80, backgroundColor: '#00f'}};
var props6 = {style: {width: LayoutParams.matchParent, x:10, y:10}};
var page1 =
  React.createElement(UIWindow, React.__spread({},  props), 
    React.createElement(LinearLayout, React.__spread({},  props6), 
      React.createElement(TextView, React.__spread({},  props2)), 
      React.createElement(TextView, React.__spread({},  props3)), 
      React.createElement(TextView, React.__spread({},  props4)), 
      React.createElement(TextView, React.__spread({},  props5))
    )
  );
RC.Dev.boot([page1]);

RC.Dev.debug();