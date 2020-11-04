
import {keepService} from '../apps/miss-keep/services/keep-service.js';
import noteTxt from '../apps/miss-keep/cmps/note-txt.cmp.js';

export default {
    template: `
    <section v-if="note" class="keep-app" @reportVal="save-info">
        <component :is="note.type"></ component>
    </section>
    `,

    data() {
        return {
            note: null
        }
    },

    methods: {
        saveInfo() {
            this.note.info
        }
    },

    created() {
        this.note = keepService.createNote();
    },

    components: {
        noteTxt
    }
}