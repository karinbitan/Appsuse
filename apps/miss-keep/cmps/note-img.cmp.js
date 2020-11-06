
export default {
    template: `
    <section class="note-img">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <span class="edit-icon"><i class="fas fa-edit"></i></span>
        <img :src="txt" />
        <button class="remove-note" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt,
        }
    },
    
    methods: {
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt, this.note.id);
        },

        removeNote() {
            this.$emit('removeNote', this.note.id);
        }
    }
}