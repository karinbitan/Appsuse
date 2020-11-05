
export default {
    template: `
    <section class="img-note">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <img :src="txt" />
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt 
        }
    },
    methods: {
    }
}