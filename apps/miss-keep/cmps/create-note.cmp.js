export default {
    template: `
    <section class="create-note">
        <input type="text" name="title" placeholder="Title" v-model="title" @blur="reportVal">
        <textarea name="txt" cols="50" placeholder="Take a note..." v-model="txt" @blur="reportVal"></textarea>
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