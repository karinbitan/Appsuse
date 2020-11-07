import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
    <section class="mail-filter">
        <form @submit.prevent="emitFilter">
            <input type="search" name="search-text" v-model="filterBy.byText" />
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
            filterBy:{byText: '', readUnRead: 'All'}
        }
    },
    methods: {
        emitFilter(){
            eventBus.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
}