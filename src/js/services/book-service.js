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

        searchBooks(title, authors, description, categories) {
            let search = [];
            if (title)
                search.push(`title=${title}`);
            if (authors)
                search.push(`authors=${authors}`);
            if (description)
                search.push(`description=${description}`);
            if (categories)
                search.push(`description=${categories}`);
            let queryParams = search.join("&");
            if (search.length > 0) {
                let url = `${this.baseUrl}/searchBook?${queryParams}`;
                return fetch(url).then((response) => {
                    return response.json();
                });
            }
            else {
                return this.getBooks();
            }

        },

        addBooksLoan(title) {
            let loan = [];
            if (title)
                loan.push(`title=${title}`);
            let queryParams = search.join("&");
            if (loan.length > 0) {
                let url = `${this.baseUrl}/searchBook?${queryParams}`;
                return fetch(url).then((response) => {
                    return response.json();
                });
            }
            else {
                return this.getBooks();
            }

        },

        deleteBook(id) {
            let url = `${this.baseUrl}/deleteBook`;
            return fetch(url, {
                method: 'delete',
                body: JSON.stringify({ _id: id }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            });
        },

        getBook(isbn) {

            let url = `${this.baseUrl}/addBook?isbn=${isbn}`;
            return fetch(url).then((response) => {
                return response.json();
            });

        }


    }


});