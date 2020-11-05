
import {keepService} from './services/keep-service.js';
import createNote from './cmps/create-note.cmp.js';
import noteTxt from './cmps/note-txt.cmp.js';
import noteImg from './cmps/note-img.cmp.js';
import noteVideo from './cmps/note-video.cmp.js';

export default {
    template: `
    <section class="keep-app">
            <create-note :note="note" @sendInfo="saveInfo" @sendType="createNewNote" @sendNote="saveToNotes"></create-note>
        <div class="saved-notes">
             <component v-bind:is="note.type" :note="note" v-for="note in noteList" :key="note.id" @sendInfo="saveInfo"></component>
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
            if (!this.note) {
                this.note = {info: {}}
            }

            this.note.info.title = title;
            this.note.info.txt = txt;
            
        },

        saveToNotes() {
            keepService.addToNotes(this.note);
            this.noteList = keepService.getNotes();
            this.note = keepService.createNote();
        },

        createNewNote(noteType) {
            this.note = keepService.createNote(noteType);
        }
    },

    created() {
        this.noteList = keepService.getNotes();
    },

    components: {
        createNote,
        noteTxt,
        noteImg,
        noteVideo
    }
}