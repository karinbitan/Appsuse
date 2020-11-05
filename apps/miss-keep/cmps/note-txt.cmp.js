
export default {
    template: `
    <section class="note-txt">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <span class="edit-icon"><i class="fas fa-edit"></i></span>
        <textarea name="txt" rows="5" placeholder="Take a note..."  v-model="txt" @change="reportVal"></textarea>
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