import { bookService } from './../services/book-service.js';
import { eventBus } from './../../../services/event-bus-service.js';

export default {
    //props: ['bookId', 'reviews'],
    props: ['bookId'],
    template: `
    <section class="reviews-container">
        <div class="review" v-for="(review, idx) in reviews" key="">
            <button class="delete-review" @click="removeReview(idx)">X</button>
            <p>Full name: {{review.fullName}} <br />
                Rate: {{review.rate}}<br />
                Review: {{review.review}}
            </p>
            <hr />
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