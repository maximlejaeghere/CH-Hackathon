/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'services/book-service', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'appController', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojinputtext', 'book-tile/loader',
  'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojformlayout', 'ojs/ojknockouttemplateutils','ctb-oda/loader'],
  function (ko, bookService, Bootstrap, ArrayDataProvider, app) {

    function BooksViewModel() {

    
    

      var self = this;
      var ids;
      
      self.clickedButton = function () {

        self.books.removeAll();

        let title = this.title();
        let author = this.author();
        let desc = this.description();
        let categories = this.categories();
        let id = this.id();
        
        if (id !== null){
          ids.push(id);
        }

        bookService.searchBooks(title, author, desc, categories).then(data => {
            
          if (data.length > 0) {
            data.forEach(item => {
              self.books.push(item);
            });
          }

        });
      }
      
      self.books = ko.observableArray([]);

      

      self.dataProviderLoanBooks = new ArrayDataProvider(app.loanBooks, { keyAttributes: '_id' });

      self.addBookToLoanBooks = function(event, data, bindingContext){
        console.log(event);
        console.log(data);
        console.log(bindingContext)
        app.loanBooks.push(data);
        console.log(app.loanBooks());
        console.log(self.dataProviderLoanBooks);

      }




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
    return new BooksViewModel();
  }
);
