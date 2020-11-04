
export default {
    template: `
    <section class="txt-note">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <textarea name="txt"cols="50" rows="10" placeholder="Take a note..." v-model="txt" @change="reportVal"></textarea>
    </section>
    `,

    data() {
        return {
            txtNoteInfo: {
                title: '',
                txt: ''
            }
        }
    },
    
    methods: {
        reportVal() {
            this.$emit(this.title, this.txt)
        }
    }
}