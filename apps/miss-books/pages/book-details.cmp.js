import { bookService } from '../services/book-service.js';
import longTxt from '../cmps/long-txt.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import reviewList from './../cmps/review-list.cmp.js';

export default {
    template: `
    <section v-if="book" class="book-details flex align-center">
        <button @click="closeDetails">X</button>
        <h2 class="book-title">{{book.title}}</h2>
        <h3 class="book-subtitle">{{book.subtitle}}</h3>
        <img src="apps/miss-books/assest/img/onSale.png" v-if="isOnSale" height="200px" class="sale-img">
        <h4>Written by: {{authors}}</h4>
        <img :src="book.thumbnail" />
        <h4>Subjects: {{categories}}</h4>
        <h4 :class="priceClass">{{book.listPrice.amount}} {{currencyIcon}}</h4>
        <h4>Language: {{book.language}}</h4>
        <h4>Published: {{book.publishedDate}} - <span class="book-age">{{publishedDateTxt}}</span></h4>
        <p>{{pageCount}}</p>
        <long-txt :txt="book.description" />
        <section class="review-container">
            <review-list :bookId="book.id" />
            <review-add :bookId="book.id" />
        </section>
    </section>
    `,

    data() {
        return {
            book: null
        }
    },
    created() {
        const id = this.$route.params.bookId;
        bookService.getBookById(id).then(book => this.book = book);
    },

    methods: {
        closeDetails() {
            this.$router.push(`/book`);
        }
    },

    computed: {
        authors() {
            return this.book.authors.join(',');
        },

        categories() {
            return this.book.categories.join(',');
        },

        currencyIcon() {
            const currency = this.book.listPrice.currencyCode;
            var icon;
            switch (currency) {
                case 'EUR':
                    icon = '€';
                    break;
                case 'ILS':
                    icon = '₪';
                    break;
                case 'USD':
                    icon = '$';
                    break;
                default:
                    icon = currency;
            };
            return icon;
        },

        publishedDateTxt() {
            const currYear = new Date().getFullYear();
            const publishedDate = this.book.publishedDate;
            const res = currYear - publishedDate;
            let txt = (res <= 1) ? 'New!' : 'Veteran Book';
            return txt;
        },

        isOnSale() {
            return this.book.listPrice.isOnSale;
        },

        pageCount() {
            const pages = this.book.pageCount;
            let txt = (pages >= 500) ? 'long' :
                (pages >= 200) ? 'decent' : 'light';
            return `This book is ${pages} pages long, that's ${txt} reading`;
        },

        priceClass() {
            const bookPrice = this.book.listPrice.amount;
            return { red: bookPrice > 150, green: bookPrice < 120 };
        }
    },

    components: {
        longTxt,
        reviewAdd,
        reviewList
    }
}