import { bookService } from './../services/book-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import bookFilter from './../cmps/book-filter.cmp.js';
import bookList from './../cmps/book-list.cmp.js';
import bookAdd from './../cmps/book-add.cmp.js';

export default {
    template: `
    <section>
        <h1>Our Books</h1>
        <book-add />
        <book-filter @filtered="setFilter" />
        <book-list :books="booksToShow" />
    </section>
    `,
    data() {
        return {
            books: bookService.getBooks(),
            filterBy: null,
        }
    },
    computed: {
        booksToShow() {
            if (this.filterBy === null) return this.books;
            const name = this.filterBy.name.toLowerCase();
            return this.books.filter((book) => {
                return book.title.toLowerCase().includes(name) && (book.listPrice.amount >= this.filterBy.minPrice)
                    && (book.listPrice.amount <= this.filterBy.maxPrice);
            })
        }
    },
    created() {
        bookService.getBooks().then((books) => {
            this.books = books;
            console.log(this.books)
        });
        eventBus.$on('book-added', () => {
            bookService.getBooks().then((books) => {
                this.books = books;
            });
        })
        console.log(this.books)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    components: {
        bookList,
        bookFilter,
        bookAdd
    }
}
