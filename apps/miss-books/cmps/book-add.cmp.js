import { bookApi } from './../books.js';
import bookAddList from './book-add-list.cmp.js';

export default {
    template: `
    <section class="add-book-container">
        <input type="search" placeholder="Search for a book" v-model="bookText" />
    <book-add-list v-if="bookText" :books="filteredBooks" />
        <button type="submit"><i class="fa fa-search"></i></button> 
    </section>
    `,
    data() {
        return {
            books: '',
            bookText: '',

        }
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