export default {
    template: `
        <section class="edit-menu">
            <button class="pin" @click="pinNote"><i class="fas fa-thumbtack"></i></button>
            <button class="remove-note" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
            <button>
            <label for="change-bgc" class="bgc"><i class="fas fa-palette"></i>
            <input type="color" id="change-bgc" value="#F6F4D2" @change="setBgc">
            </label>
            </button>
        </section>
    `,

    props: ['noteId'],

    data() {
        return {
            colorList: ['#ccdbfd', '#f7cbb9', '#fadde1', '#CBDFBD', '#F6F4D2', 'white', '#e0e1dd']
        }
    },

    methods: {
        removeNote() {
            this.$emit('removeNote', this.noteId);
        },

        pinNote() {
            this.$emit('notePinned', this.noteId);
        },

        unpinNote() {
            this.$emit('noteUnpinned', this.noteId);
        },

        setBgc(ev) {
            var val = ev.target.value;
            this.$emit('bgcChosen', this.noteId, val);
        }
    }
}