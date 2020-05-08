/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojanimation','knockout', 'services/book-service', 'ojs/ojbootstrap', 'ojs/ojpopup', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext', 'book-tile/loader',
  'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojformlayout', 'ojs/ojknockouttemplateutils', 'ojs/ojarraydataprovider','ctb-oda/loader'],
  function (AnimationUtils, ko, bookService, Bootstrap) {

    function AboutViewModel() {

      var self = this;
      self.clickedButton = function () {

        self.books.removeAll();

        let title = this.title();
        let author = this.author();
        let desc = this.description();
        let categories = this.categories();

        bookService.searchBooks(title, author, desc, categories).then(data => {
            
          if (data.length > 0) {
            data.forEach(item => {
              self.books.push(item);
            });
          }

        });
      }
      self.books = ko.observableArray([]);



      bookService.getBooks().then(data => {
        if (data.length > 0) {
          data.forEach(item => {
            self.books.push(item);
          });
        }
      });

      self.title = ko.observable("");
      self.author = ko.observable("");
      self.categories = ko.observable("");
      self.description = ko.observable("");


      this.buttonClick = function (event) {
        this.clickedButton();
        return true;
      }.bind(this);

      this.deleteBook = function (event) {
        let id =  event.currentTarget.book._id;
        bookService.deleteBook(id).then(r => {
          self.books.remove(x => x._id == id)
        });
        return true;
      }.bind(this);

      this.startAnimationListener = function (event) {
        var ui = event.detail;
        if (event.target.id !== 'popup1') { return; }
  
        if (ui.action === 'open') {
          event.preventDefault();
          var options = { direction: 'top' };
          AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
        } else if (ui.action === 'close') {
          event.preventDefault();
          ui.endCallback();
        }
      };
      this.openListener = function () {
        var popup = document.getElementById('popup1');
        popup.open('#btnGo');
      };
      this.cancelListener = function () {
        var popup = document.getElementById('popup1');
        popup.close();
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
