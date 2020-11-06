import {keepService} from '../services/keep-service.js'
export default {
    template: `
    <section class="note-video">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <iframe width="560" height="315" :src="urlForEmbed" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <button class="remove-note" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
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

    }
}