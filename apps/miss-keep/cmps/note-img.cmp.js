import noteEdit from './note-edit-menu.cmp.js';

export default {
    template: `
    <section class="note-img" v-bind:style="{backgroundColor: this.note.style.background}">
        <button class="unpin" @click="unpinNote" v-show="this.note.isPinned"><i class="fas fa-thumbtack"></i></button>
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <img :src="txt" />
        <noteEdit :noteId="this.note.id" @removeNote="removeNote" @notePinned="pinNote" @noteUnpinned="unpinNote" @bgcChosen="setBgc"/>
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
        },

        pinNote() {
            this.$emit('notePinned', this.note.id);
        },

        unpinNote() {
            this.$emit('noteUnpinned', this.note.id);
        },

        setBgc(id, val) {
            this.$emit('bgcChosen', id, val);
        }
    },

    components: {
        noteEdit
    }
}