import { bookApi } from './../books.js';
import bookAddList from './book-add-list.cmp.js';

export default {
    template: `
    <section class="add-book-container">
    <label>Search for a book: 
        <input type="search" placeholder="Search for a book" v-model="bookText" />
    </label>
    <book-add-list v-if="bookText" :books="filteredBooks" />
    </section>
    `,
    data() {
        return {
            books: '',
            bookText: '',

        }
    },
    methods: {
        // findBook(input) {
        //     console.log(input);
        //     return this.books.filter((book) => {
        //     return book.volumeInfo.title.toLowerCase().include(this.bookText.toLowerCase())
        //     })
        // }
    },
    created() {
        bookApi.getBooksFromApi()
            .then((books) => {
                this.books = books
            });
    },
    computed: {
        filteredBooks() {
            return this.books.filter((book) => {
                return book.volumeInfo.title.toLowerCase().startsWith(this.bookText.toLowerCase())
            })
        }
    },
    components: {
        bookAddList
    }
}