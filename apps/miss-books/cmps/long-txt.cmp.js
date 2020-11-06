export default {
    props: ['txt'],
    
    template: `
    <section>
        <p>{{txtToShow}}</p>
        <button v-if="txt.length > 100" @click="isFullyShown = !isFullyShown">{{btnTxt}}</button>
    </section>
    `,

    data() {
        return {
            isFullyShown: false
        }
    },

    computed: {
        txtToShow() {
            const txt = this.txt;
            if (txt.length > 100 && !this.isFullyShown) {
                return txt.substring(0, 100) + '...';
            } else return txt;
        },

        btnTxt() {
            let btnTxt = (this.isFullyShown)? 'Read Less' : 'Read More';
            return btnTxt;
        }
    }
}