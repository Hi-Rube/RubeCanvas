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
var props6 = {style: {width: LayoutParams.matchParent, x:25, y:0}};
var page1 =
  <UIWindow {...props} >
    <LinearLayout {...props6}>
      <TextView {...props2}/>
      <TextView {...props3}/>
      <TextView {...props4}/>
      <TextView {...props5}/>
    </LinearLayout>
  </UIWindow>;
RC.Dev.boot([page1]);

RC.Dev.debug();