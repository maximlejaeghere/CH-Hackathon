/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojrouter', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout'],
  function(ko, moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, Router, ArrayDataProvider, KnockoutTemplateUtils) {
     function ControllerViewModel() {
        var self = this;

        self.KnockoutTemplateUtils = KnockoutTemplateUtils;

        // Handle announcements sent when pages change, for Accessibility.
        self.manner = ko.observable('polite');
        self.message = ko.observable();
        document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

        function announcementHandler(event) {
          setTimeout(function() {
            self.message(event.detail.message);
            self.manner(event.detail.manner);
          }, 200);
        };

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

       // Router setup
       self.router = Router.rootInstance;
       self.router.configure({
        'books': {label: 'Books'},
        'scanBook': {label: 'Scan Book'},
        'loanedBooks': {label: 'Loaned Books'},
        'loginScreen': {label: 'Login Screen', isDefault: true}
       });
      Router.defaults['urlAdapter'] = new Router.urlParamAdapter();

      self.loadModule = function () {
        self.moduleConfig = ko.pureComputed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          return moduleUtils.createConfig({ viewPath: viewPath,
            viewModelPath: modelPath, params: { parentRouter: self.router } });
        });
      };

       
      


      
      // Navigation setup
      var navDataAdmin = [
      {name: 'Books', id: 'books',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
       {name: 'Add Book', id: 'scanBook',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
      ];

      var navDataStudent = [
        {name: 'Books', id: 'books',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
         {name: 'Loaned Books', id: 'loanedBooks',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
        ];
      self.navDataProvider = new ArrayDataProvider(navData, {keyAttributes: 'id'});

      // User Info used in Global Navigation area
      self.userLogin = ko.observable("Maxim Lejaeghere");
      //self.toolBarDisplay = ko.observable("smScreen() ? 'icons' : 'all'");
      self.menuDisabeled = ko.observable("true");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
      ]);
     }

     self.user = ko.observable();
      //Hide or show navigation
      self.hideNav = function(){
        $("#navlistcontainer").css("display", "none");
        $("#logoutButton").css("display", "none");
      };
      self.showNav = function(){
        $("#navlistcontainer").css("display", "block");
        $("#logoutButton").css("display", "block");
      };
// function for when the app starts if logged in or not and wher to navigate
      function whenDocumentReady(){
        
        if(sessionStorage.user){
          self.showNav();
          self.user(JSON.parse(sessionStorage.getItem('user')));
          if(self.user().isAdmin === true){
            console.log("admin");
            oj.Router.rootInstance.go('eventOverview');
          }
          else if (self.user().isAdmin === false){
            console.log("Volunteer");
            oj.Router.rootInstance.go('task');
          }
        }
        else{
          self.hideNav();
          oj.Router.rootInstance.go('books');
        }
      };
      $(document).ready(whenDocumentReady);
// function for the navigation possibilities admin and volunteer
      self.user.subscribe(function(newValue){
        self.showNav();

        if(self.user().isAdmin === true){
          self.navData(navDataAdmin);
        }
        else if (self.user().isAdmin === false){
          self.navData(navDataStudent);
        }
        else{
        };

        
        
      });
      // function for the logout 
      this.buttonLogoutClick = function(event) {
        self.user("");
        whenDocumentReady();
        sessionStorage.removeItem('user');
        oj.Router.rootInstance.go('books');
      };
     


     return new ControllerViewModel();
  }
);
