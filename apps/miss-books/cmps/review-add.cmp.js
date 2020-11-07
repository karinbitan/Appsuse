import { bookService } from './../services/book-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import reviewList from './review-list.cmp.js';

export default {
    props: ['bookId'],
    template: `
<section class="review-book">
    <h2>Reviews</h2>
    <form @submit.prevent="onAddReview">
        <label>Full Name:<input type="text" value="Books Reader"
        placeholder="Write your full name.." v-model="review.fullName" ref="fullName" /></label>
        <br />
        <label for="rate">Choose rate:</label>
        <select id="rate" name="rate" v-model="review.rate" >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <br />
        <label for="review" name="review">Write your review here:</label> <br />
        <textarea id="review" name="review" v-model="review.review" ></textarea>

        <br />
        <button>Send review</button>
    </form>
    <!-- <review-list v-if="isHidden" :bookId="bookId" :reviews="reviews" /> -->
</section>
`,
    data() {
        return {
            review: {
                fullName: '',
                rate: 1,
                review: ''
            },
            //reviews: [],
            isHidden: false
        }
    },
    created() {
        //this.reviews = bookService.getReviews(this.bookId);

    },
    mounted() {
        this.$refs.fullName.focus();
        console.log(this.$refs.fullName)
    },
    methods: {
        onAddReview() {
            var bookId = this.bookId;
            var review = this.review;
            bookService.addReview(bookId, review);
            eventBus.$emit('reviewCreated');
            // this.reviews = bookService.getReviews(this.bookId);
        }
    },
    components: {
        reviewList
    }
}


