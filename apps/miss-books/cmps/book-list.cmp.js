import bookPreview from './../cmps/book-preview.cmp.js';

export default {
    props: ['books'],
    
    template: `
    <section class="book-list">
        <h2>Our Books</h2>
            <ul> 
                <book-preview v-for="book in books" :key="book.id" :book="book" @click.native="goToBook('/book/' +book.id)" />
            </ul>
    </section>
    `,

    methods: {
        goToBook(bookId) {
            this.$router.push(`${bookId}`);
        }
    },

    components: {
        bookPreview
    }

}