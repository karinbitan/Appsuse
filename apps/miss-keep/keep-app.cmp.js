
import {keepService} from './services/keep-service.js';
import noteTxt from './cmps/note-txt.cmp.js';
import createNote from './cmps/create-note.cmp.js';

export default {
    template: `
    <section v-if="note" class="keep-app">
        <form @submit.prevent="saveNote">
            <create-note :note="note" @sendInfo="saveInfo"></create-note>
            <button @click="saveNote">Add Note</button>
        </form>
        <div class="saved-notes">
            <div v-for="note in noteList" :key="note.id">
                <h3>{{note.info.title}}</h3>
                <p>{{note.info.txt}}</p>
            </div>
        </div>
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
            this.note = null;
            this.note = keepService.createNote();
        }
    },

    created() {
        this.note = keepService.createNote();
    },

    components: {
        createNote,
        noteTxt
    }
}