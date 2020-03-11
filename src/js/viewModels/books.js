/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'ojs/ojbootstrap', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext', 'composites/book-tile/loader',
  'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojformlayout', 'ojs/ojknockouttemplateutils', 'ojs/ojarraydataprovider'],
  function (ko, Bootstrap) {

    function AboutViewModel() {

      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      self.clickedButton = function (isbn) {

        let json = localStorage.getItem(`ch-${isbn}`);
        if (json != null && json !== "") {
          data = JSON.parse(json);
          self.books(data.items);
        } else {

          let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
          let postUrl = `https://hackathonbackend.steltixlabs.com/postBooks`;

          let books = self.books;
          fetch(url).then((response) => {
            response.json().then((data) => {
              let totalItems = data.totalItems;
              if (totalItems > 0) {
                data.items.forEach(item => {
                  self.books.push(item);
                  item.APIKEY = 'somestuff'
                  fetch(postUrl, {
                    body: JSON.stringify(item.volumeInfo),
                    method: 'post'
                  }).then(r => console.log(r)).catch(r => console.log(r));
                });
              }

            })
          });
        }
      }

      self.books = ko.observableArray([]);

      let url = `https://hackathonbackend.steltixlabs.com/getBooks`;
      fetch(url).then((response) => {
        response.json().then((data) => {
          let totalItems = data.length;
          if (totalItems > 0) {
            data.forEach(item => {
              self.books.push(item);
            });
          }
        });
      });

      self.isbn = ko.observable("1465479031");


      this.buttonClick = function (event) {
        this.clickedButton(this.isbn._latestValue);
        return true;
      }.bind(this);

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
