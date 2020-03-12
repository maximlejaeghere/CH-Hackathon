define([], function () {

    return {

        baseUrl: 'https://hackathonbackend.steltixlabs.com',

        getBooks() {

            let url = `${this.baseUrl}/getBooks`;
            return fetch(url).then((response) => {
                return response.json();
            });
        },

        addBook(book) {

            

        },

        getBook(isbn) {
            
            let url = `${this.baseUrl}/addBook?isbn=${isbn}`;
            return fetch(url).then((response) => {
                return response.json();
            });

        },

        searchBooks(search) {

        }


    }


});