
import {keepService} from './services/keep-service.js';
import noteTxt from './cmps/note-txt.cmp.js';

export default {
    template: `
    <section v-if="note" class="keep-app">
        <component :is="note.type"  @sendInfo="saveInfo"></component>
        <button @click="saveNote">Add Note</button>
        <div v-for="note in noteList"></div>
    </section>
    `,

    data() {
        return {
            note: null,
            noteList: []
        }
    },

    methods: {
        saveInfo(title, txt) {
            this.note.info.title = title;
            this.note.info.txt = txt;
        },

        saveNote() {
            keepService.addToNotes(this.note);
            this.noteList = keepService.getNotes();
            this.note = keepService.createNote();
            console.log(this.noteList);
        }
    },

    created() {
        this.note = keepService.createNote();
    },

    components: {
        noteTxt
    }
}