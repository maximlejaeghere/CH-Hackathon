define(['accUtils','knockout','appController', 'ojs/ojbootstrap', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils','ojs/ojmessaging', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojformlayout', 'ojs/ojbutton', 'ojs/ojrouter'],
 function(accUtils, ko, app,  Bootstrap, ResponsiveUtils, ResponsiveKnockoutUtils, Message) {

    function LoginViewModel() {
      var self = this;
      var baseDeptArray = [
        { AdminId: '01', FirstName: 'Maxim', LastName: 'Lejaeghere', PhoneNumber: '0474/61.42.44', Email: 'mlejaeghere@gmail.com' },
        { AdminId: '20', FirstName: 'Nicolas', LastName: 'Lejaeghere', PhoneNumber: '0474/61.42.44', Email: 'mlejaeghere@gmail.com' },
        { AdminId: '30', FirstName: 'Eva', LastName: 'Vermeiren', PhoneNumber: '0474/61.42.44', Email: 'mlejaeghere@gmail.com' }
        ];

    this.deptArray = baseDeptArray
    
      self.password = ko.observable("");
      self.username = ko.observable("");
      self.warning = ko.observable("");

      self.loginClick = function(){
        var st = ("");
        $.getScript('js/md5.js', function(){
           st = b64_md5(self.password());
        //Wachtwoord = Hallo
        if (st === "0b+TKZ3hto5tOCyJO/EhXw" && self.username() === "Maxim"){
          app.user({ AdminId: '01', FirstName: 'Maxim', LastName: 'Lejaeghere', PhoneNumber: '0474/61.42.44', Email: 'mlejaeghere@gmail.com', isAdmin : true });
          sessionStorage.setItem('user', JSON.stringify(app.user()));
          oj.Router.rootInstance.go('books');
         }
         else {
          self.warning("Verkeerde gebruikersnaam of wachtwoord");
         };
        })
      }
      
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('defaulttemplate page loaded.', 'assertive');
        document.title = "defaulttemplate";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return LoginViewModel;
  }
);