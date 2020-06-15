/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'services/book-service', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'appController', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel', 'book-tile/loader',
  'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojformlayout', 'ojs/ojknockouttemplateutils','ctb-oda/loader'],
  function (ko, bookService, Bootstrap, ArrayDataProvider, app) {

    function BooksViewModel() {

      var self = this;

      var lastItemId = app.loanBooks().length;

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
      } // end clickedButton

      // Add books to book overview
      self.addBookToLoanBooks = function(event, data, bindingContext){
        //console.log(event);
        //console.log(data);
        //console.log(bindingContext)
        for (let i = 0; i < app.loanBooks.length; i++) {
          var loanBooks = app.loanBooks[i];
          
       
        }
        app.loanBooks.push({ id: lastItemId, item: data.data });
        lastItemId++;
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

      /* this.deleteBook = function (event) {
        let id =  event.currentTarget.book._id;
        bookService.deleteBook(id).then(r => {
          self.books.remove(x => x._id == id)
        });
        return true;
      }.bind(this); */

       // Delete book in book overview   
       self.selectedItems = ko.observableArray([]);
       
       self.books = ko.observableArray([]);
 
       self.dataProviderLoanBooks = new ArrayDataProvider(app.loanBooks, { keyAttributes: 'item._id' });
 
       self.removeSelected = function () {  
         self.selectedItems().forEach(function (id) {  
           app.loanBooks.remove(function (item) {
             return (item.id === id);        
           });
         }.bind(this));
       }.bind(this);

       this.currentIndex;
       this.currentItem = ko.observable('');

       this.handleCurrentItemChanged = function (event) {
        var key = event.detail.value;
        var items = app.loanBooks();
        for (var i = 0; i < items.length; i++) {
          if (items[i]._id === key) {
            this.currentIndex = i;
            this.currentItem(items[i].item);
            break;
          }
        }
      }


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
