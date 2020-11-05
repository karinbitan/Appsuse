import {keepService} from '../services/keep-service.js'
export default {
    template: `
    <section class="note-video">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <iframe :src="urlForEmbed" referrerpolicy="no-referrer"></iframe>
    </section>
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
        urlForEmbed() {
            var url = this.txt
            var vidId = keepService.youtubeParser(url);
            var urlForEmbed = `https://www.youtube.com/embed/${vidId}`;
            console.log(vidId);
            return urlForEmbed;
        },

        reportVal() {
            this.$emit('sendInfo', this.title, this.txt);
        }
    },

    created() {

    }
}