import {keepService} from '../services/keep-service.js';
import noteEdit from './note-edit-menu.cmp.js';

export default {
    template: `
    <section class="note-video" v-bind:style="{backgroundColor: this.note.style.background}">
        <button class="unpin" @click="unpinNote" v-show="this.note.isPinned"><i class="fas fa-thumbtack"></i></button>
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <iframe width="560" height="315" :src="urlForEmbed" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <noteEdit :noteId="this.note.id" @removeNote="removeNote" @notePinned="pinNote" @noteUnpinned="unpinNote" @bgcChosen="setBgc"/>
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt,
            id: this.note.id
        }
    },

    methods: {
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt, this.id);
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

    computed: {
        urlForEmbed() {
            var url = this.txt
            var vidId = keepService.youtubeParser(url);
            var urlForEmbed = `https://www.youtube.com/embed/${vidId}`;
            return urlForEmbed;
        }
    },

    created() {

    },

    components: {
        noteEdit
    }
}