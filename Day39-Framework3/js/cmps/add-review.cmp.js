import {bookService} from '../services/book-service.js';

export default {
    props: ['bookId'],
    template: `
    <section class="add-review">
        <form @submit.prevent="addReview"></form>
            <h3>Review the book!</h3>
            <label for="name-input">Full Name:
                <input type="text" name="name-input" v-model:value="review.fullName">
            </label>
            <h3>Rate:</h3>
            <div class="star-rating" v-for="idx in 5" :key="idx" value="review.rating">
                <p class="star" :class="checkStars(idx)"><i class="fas fa-star"></i></p>
            </div>
            <label for="read-at">Read At:
                <input type="date" name="read-at" v-model:value="review.readAt">
            </label>
            <label for="rev-txt">What Did You Think?
                <textarea name="rev-txt" cols="50" rows="10" v-model:value="review.revTxt"></textarea>
            </label>
            <input type="submit" value="Add Review">
            <button @click="cancelRev">Cancel</button>
    </section>
    `,

    data() {
        return {
            review: null
        }
    },

    methods: {
        addReview() {
            bookService.addReview(this.review, this.bookId);
            this.review = null;
        },

        cancelRev() {
            this.review = null;
        },

        selectedStars(idx) {
            this.stars = idx;
        },
        checkStars(idx) {
            return { checked: this.stars >= idx }
        }
    },

    created() {
        this.review = bookService.getNewReview()
    }
}