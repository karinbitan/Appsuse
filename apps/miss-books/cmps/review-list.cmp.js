import { bookService } from './../services/book-service.js';
import { eventBus } from './../../../services/event-bus-service.js';

export default {
    //props: ['bookId', 'reviews'],
    props: ['bookId'],
    template: `
    <section class="reviews-container">
        <h3>Reviews</h3>
        <div class="review" v-for="(review, idx) in reviews" key="">
            <button @click="removeReview(idx)">X</button>
            <h4>{{review.fullName}}</h4>
            <p><span>Rate: {{review.rate}}</span> <br />
                Review: {{review.review}}
        </p>
        </div>
    </section>
    `,
    data() {
        return {
            reviews: []
        }
    },
    created() {
        this.reviews = bookService.getReviews(this.bookId);
        eventBus.$on('reviewCreated', () => {
            this.reviews = bookService.getReviews(this.bookId);
        });
    },
    methods: {
        removeReview(idx) {
            this.reviews = this.reviews.filter((review, index) => {
                return idx != index;
            })
            bookService.saveReviewToStorage(this.bookId, this.reviews);
            eventBus.$emit('show-msg', 'Review removed!');
        }
    }
}