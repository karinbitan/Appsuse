export default {
    template: `
    <section class="book-filter">
        <form @submit.prevent="emitFilter">
            <input type="text" id="txt-search" v-model="filterBy.name" placeholder="Search book title">

            <label for="minPrice">From Price: {{minPriceValue}}</label>
            <input type="range" name="minPrice" min="0" max="600" value="0" v-model="filterBy.minPrice">

            <label for="maxPrice">To Price: {{maxPriceValue}}</label>
            <input type="range" name="maxPrice" min="0" max="600" value="0" v-model="filterBy.maxPrice">

            <button>Apply</button>
        </form>
    </section>
    `,

    data() {
        return {
            filterBy: {
                name: '',
                minPrice: 0,
                maxPrice: 600
            }
        }
    },

    methods: {
        emitFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    },

    computed: {
        maxPriceValue() {
        return this.filterBy.maxPrice;
        },

        minPriceValue() {
        return this.filterBy.minPrice;
        }
    }
}