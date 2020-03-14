/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/ctb-oda-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {
    
    function ctbOdaComponentModel(context) {
        var self = this;

        var chatWidgetSettings = {
          URI: context.properties.url,
          channelId: context.properties.channelId
      };
        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['ctb-oda'];
        console.log(context.properties.channelId);
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }
        function initSdk(name) {
          // Default name is Bots
          if (!name) {
              name = 'Bots';
          }
          setTimeout(() => {
              const Bots = new WebSDK(chatWidgetSettings); // Initiate library with configuration
              Bots.connect()                               // Connect to server
                  .then(() => {
                      console.log("Connection Successful");
                  })
                  .catch((reason) => {
                      console.log("Connection failed");
                      console.log(reason);
                  });
              window[name] = Bots;
          });
        }
        self.connected = function() {
          console.log("connected");
          //var script = document.createElement("script");  // create a script DOM node
          //script.src = "js/web-sdk.js";  // set its src to the provided URL
          //document.head.appendChild(script);  
          initSdk('name');
          // Implement further logic if needed
        };
        
          
        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ctbOdaComponentModel;
});