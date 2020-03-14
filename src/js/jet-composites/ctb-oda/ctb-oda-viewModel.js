'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/ctb-oda-strings', 'ojs/ojcontext', './utilities/web-sdk', 'ojs/ojknockout'], function (ko, componentStrings, Context, oda) {

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
        channelId: context.properties.channelId
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
          window[name] = Bots;
        });
      }
      self.busyResolve();
    };

    return ctbOdaComponentModel;
  });