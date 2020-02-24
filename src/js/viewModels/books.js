/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'ojs/ojbootstrap', 'promise', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojformlayout'],
  function (ko, Bootstrap) {

    function AboutViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      self.clickedButton = function (isbn) {

        let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`

        console.log(url);

        let book = self.book;
        let title = self.title;

        fetch(url).then((response) => {
          response.json().then((data) => {
            let totalItems = data.totalItems;
            if (totalItems > 0) {

              book(data.items[0].volumeInfo);
              title(data.items[0].volumeInfo.title);
              console.log(book._latestValue.title);
            }
          })
        });



      }

      self.title = ko.observable('No title')
      self.book = ko.observable();
      self.isbn = ko.observable('1631869272');

      this.buttonClick = function (event) {
        this.clickedButton(this.isbn._latestValue);
        return true;
      }.bind(this);


      this.handleValueChanged = function (event) {
        console.log(event);
      }

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
