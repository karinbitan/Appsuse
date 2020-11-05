import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
    <section class="mail-filter">
        <form @submit.prevent="emitFilter">
            <input type="search" name="search-text" v-model="filterBy.bySubject" />
            <select v-model="filterBy.readUnRead" name="read-unread">
                <option>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </section>
    `,
    data(){
        return {
            filterBy:{bySubject: '', readUnRead: 'All'}
        }
    },
    methods: {
        emitFilter(){
            // this.$emit('filtered', this.filterBy);
            eventBus.$emit('filtered', this.filterBy)
            console.log(this.filterBy)
        }
    }
}