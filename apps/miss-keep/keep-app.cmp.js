
import {keepService} from './services/keep-service.js';
import noteTxt from './cmps/note-txt.cmp.js';
import noteImg from './cmps/note-img.cmp.js';
import createNote from './cmps/create-note.cmp.js';

export default {
    template: `
    <section class="keep-app">
        <form @submit.prevent="saveNote">
            <create-note :note="note" @sendInfo="saveInfo"></create-note>
            <button>Add Note</button>
        </form>
        <div class="saved-notes">
             <component v-bind:is="note.type" :note="note" v-for="note in noteList" :key="note.id"></component>
            <!-- <div v-for="note in noteList" :key="note.id">
                <h3>{{note.info.title}}</h3>
                <p>{{note.info.txt}}</p>
            </div> -->
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

            this.note.type = 'note-txt';
            this.note.info.title = title;
            this.note.info.txt = txt;
        },

        saveNote() {
            keepService.addToNotes(this.note);
            this.noteList = keepService.getNotes();
            //this.note = keepService.createNote();
        }
    },

    created() {
        // this.note = keepService.createNote();
        // this.noteList.push(this.note);


        //test note of type img 
        // var note2 = keepService.createNote();
        // note2.type = 'note-img';
        // this.noteList.push(note2);
    },

    components: {
        createNote,
        noteTxt,
        noteImg
    }
}