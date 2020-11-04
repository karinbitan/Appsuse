
export default {
    template: `
    <section>
        <form @submit.prevent="emitFilter">
            <input type="search" v-model="filterBy.bySubject" />
        </form>
    </section>
    `,
    data(){
        return {
            filterBy:{bySubject: ''}
            // , byRead: true, byUnread: false 
        }
    },
    methods: {
        emitFilter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}