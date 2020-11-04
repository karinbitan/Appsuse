export default {
    template: `
    <section class="create-note">
        <input type="text" name="title" placeholder="Title" v-model="title" @blur="reportVal">
        <textarea name="txt" cols="50" placeholder="Take a note..." v-model="txt" @blur="reportVal"></textarea>
        <!-- Instead of textarea above, should be an option to select the note type -->
        <!-- See: "Notes Variations" in the PDF -->
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note ? this.note.info.title : '',
            txt: this.note ? this.note.info.txt : ''
        }
    },
    
    methods: {
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt);
        }
    }
}