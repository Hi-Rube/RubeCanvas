function init(Global) {
  var UIWindow = require('./component/UIWindow');
  var UITextView = require('./component/UITextView');
  var UIImageView = require('./component/UIImageView');
  var UILinearLayout = require('./layout/UILinearLayout');
  var DeveloperTool = require('./developerTool');
  var View = require('./View');

  Global['RC'] = Global['RubeCanvas'] = {
    UI: {
      Window: UIWindow,
      TextView: UITextView,
      ImageView: UIImageView,
      LinearLayout: UILinearLayout
    },
    Dev: DeveloperTool,
    Params: {
      Layout: View.LayoutParams
    }
  };

};

if (Window) {
  (function (Global) {
    Global.RubeCanvasInit = init;
    Global.RCInit = init;
  })(Window);
}

