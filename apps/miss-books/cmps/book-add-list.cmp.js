import { eventBus } from '../../../services/event-bus-service.js';
import { bookService } from './../services/book-service.js';

export default {
    props: ["books"],
    template: `
    <div class="found-books">
    <ul>
        <li v-for="(book, idx) in books" :key="book.id">{{book.volumeInfo.title}}
            <button @click="onAddBook(book)">+</button></li>
    </ul>
</div>
    `,
    methods: {
        onAddBook(book) {
            var newBook = {
                id: book.id,
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                authors: book.volumeInfo.authors,
                publishedDate: parseInt(book.volumeInfo.publishedDate.split('-')[0]),
                description: book.volumeInfo.description,
                pageCount: book.volumeInfo.pageCount,
                categories: book.volumeInfo.categories,
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                language: book.volumeInfo.language,
                listPrice: {
                    amount: 109,
                    currencyCode: "EUR",
                    isOnSale: false
                }
            }
            bookService.addBook(newBook).then(() => {
                eventBus.$emit('book-added');
                eventBus.$emit('show-msg', 'Book added successfuly');
            });
        }
    },
    components: {
        bookService
    }
}