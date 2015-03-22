function init(Global) {
  var UIWindow = require('./UIWindow');
  var UITextView = require('./UITextView');
  var DeveloperTool = require('./developerTool');

  Global['RC'] = Global['RubeCanvas'] = {
    UI: {
      Window: UIWindow,
      TextView: UITextView
    },
    Dev: DeveloperTool
  };

};

(function (Global) {
  Global.RubeCanvasInit = init;
  Global.RCInit = init;
})(Window);

