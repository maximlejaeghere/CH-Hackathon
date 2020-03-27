'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/ctb-oda-strings', 'ojs/ojcontext', './utilities/web-sdk', 'ojs/ojknockout','ojs/ojrouter'], 
  function (ko, componentStrings, Context, oda) {

    function ctbOdaComponentModel(context) {
      var self = this;
      var busyContext = Context.getContext(context.element).getBusyContext();
      var options = { "description": "Web Component Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;
      self.properties = context.properties;
      self.res = componentStrings['ctb-oda'];

      const chatWidgetSettings = {
        URI: context.properties.url,
        channelId: context.properties.channelId,
        colors: {"branding": "#F6A91B", "text": "#0A3254", "textLight": "#737373"},
        enableSpeech: true,
        enableBotAudioResponse: true,
        height: '510px',
        width: '350px',
        openChatOnLoad: false,
        initUserHiddenMessage: "Hello",

      };
      
      

      self.connected = function () {
        initSdk();
      };

      function initSdk(name) {
        // Set a default name
        if (!name) {
          name = 'Bibi';
        }
        setTimeout(() => {
          const Bots = new oda(chatWidgetSettings);
          Bots.connect()
            .then(() => {
              //console.log("Connection Successful");
            })
            .catch((reason) => {
              console.log("Connection failed");
              console.log(reason);
            });
            Bots.on('message:received', function(message) {
              console.log(message.messagePayload.text)
              if (message.messagePayload.text.includes("educators")){
                oj.Router.rootInstance.go('educators');
              }
              if (message.messagePayload.text.includes("language")){
                oj.Router.rootInstance.go('books');
              }
          });
      
          window[name] = Bots;
        });
      }
      self.busyResolve();
    };

    return ctbOdaComponentModel;
  });