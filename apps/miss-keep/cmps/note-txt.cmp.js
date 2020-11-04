
export default {
    template: `
    <section class="txt-note">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <textarea name="txt" cols="50" rows="10" placeholder="Take a note..." v-model="txt" @change="reportVal"></textarea>
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
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt);
        }
    }
}