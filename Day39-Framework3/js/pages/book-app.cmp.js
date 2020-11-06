import {bookService} from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';

export default {

    template: `
    <section class="book-app">
        <book-filter @filtered="setFilter"></book-filter> 
        <book-list :books="booksToShow"></book-list>
    </section>
    `,

data () {
    return {
        filterBy: null,
        books: bookService.getBooks().then(books => this.books = books),
        selectedBook: null
    }
},

computed: {
    booksToShow() {
        if (!this.filterBy) return this.books;
        const {name, minPrice, maxPrice} = this.filterBy;
        return this.books.filter((book) => 
            book.title.toLowerCase().includes(name.toLowerCase()) && 
            book.listPrice.amount >= minPrice &&
            book.listPrice.amount <= maxPrice
            );
    }
},

methods: {
    setFilter(filterBy) {
        this.filterBy = filterBy;
    },

    closeDetails() {
        this.selectedBook = null;
    }
},

created(){
    bookService.query()
        .then(books => this.books = books)
},

components: {
    bookList,
    bookDetails,
    bookFilter
}
}