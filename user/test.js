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
var props = {style: styles, action: 'main'};
var props2 = {style: {width: 30, x: 30, y: 20, backgroundColor: '#fff'}};
var props3 = {style: {width: LayoutParams.matchParent, height: 10, x: 3, y: 10, backgroundColor: '#0ff'}};
var props6 = {style: {width: LayoutParams.matchParent, x: 1, y: 10}};
var props7 = {style: {width: LayoutParams.matchParent, x: 2, y: 20}};
var props8 = {style: {width: 30, height: 90, x: 30, y: 20, backgroundColor: '#000'}};
var props9 = {style: {width: 50, height: 20, x: 0, y: 50, backgroundColor: '#0f9'}};
var page1 =
  <UIWindow {...props} >
    <ImageView {...props2}/>
    <TextView {...props3}/>
  </UIWindow>;
RC.Dev.boot([page1]);

RC.Dev.debug();