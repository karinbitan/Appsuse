
import {keepService} from './services/keep-service.js';
import createNote from './cmps/create-note.cmp.js';
import noteTxt from './cmps/note-txt.cmp.js';
import noteImg from './cmps/note-img.cmp.js';
import noteVideo from './cmps/note-video.cmp.js';
import noteTodo from './cmps/note-todo.cmp.js';

export default {
    template: `
    <section class="keep-app">
            <create-note :note="note" @sendInfo="saveInfo" @sendType="createNewNote" @sendNote="saveToNotes"></create-note>
        <div class="saved-notes">
             <component v-bind:is="note.type" :note="note" v-for="note in noteList" :key="note.id" @sendInfo="saveInfo" @removeNote="removeFromList" @notePinned="unshiftNote" @noteUnpinned="removePin" @bgcChosen="updateBgc"></component>
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
        saveInfo(title, txt, id) {
            if (!this.note) {
                this.note = {info: {}}
            }
            
            this.note.info.title = title;
            this.note.info.txt = txt;
            keepService.updateInStorage(id, this.note);
            
        },

        saveToNotes() {
            keepService.addToNotes(this.note);
            this.noteList = keepService.getNotes();
            this.note = keepService.createNote();
        },

        createNewNote(noteType) {
            this.note = keepService.createNote(noteType);
        },

        removeFromList(noteId) {
            keepService.removeFromStorage(noteId);
            this.noteList = keepService.getNotes();
        },

        unshiftNote(noteId) {
            const idx = this.noteList.findIndex(note => note.id === noteId);
            let note = this.noteList[idx];
            if (!note.isPinned) {
                keepService.copyNote(noteId);
                this.noteList = keepService.getNotes();
            } else this.removePin(noteId);
        },

        removePin(noteId) {
            const idx = this.noteList.findIndex(note => note.id === noteId);
            let note = this.noteList[idx];
            note.isPinned = false;
            keepService.updateInStorage(noteId, note);
            
        },

        updateBgc(noteId, val) {
            const idx = this.noteList.findIndex(note => note.id === noteId);
            let note = this.noteList[idx];
            note.style.background = val;
            keepService.updateInStorage(noteId, note);
        }
    },

    created() {
        this.noteList = keepService.getNotes();
    },

    components: {
        createNote,
        noteTxt,
        noteImg,
        noteVideo,
        noteTodo
    }
}