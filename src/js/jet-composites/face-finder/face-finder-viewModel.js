/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/face-finder-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {
    
    function ExampleComponentModel(context) {
        var self = this;
        
        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable();
        self.properties = context.properties;
        self.res = componentStrings['face-finder'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }
        console.log(tf);
        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();

       
    };

    return ExampleComponentModel;
});