export default {
    template: `
    <section class="create-note flex-column align-center">
        <input type="text" name="title" placeholder="Add Title" v-model="title" @blur="reportVal">
        <textarea name="txt" cols="50" v-model="txt" @blur="reportVal"></textarea>
        <label for="choose-txt">txt
            <input type="radio" name="choose-type" value="txt" id="choose-txt" @click="newNoteType">
        </label>
        <label for="choose-img">img
            <input type="radio" name="choose-type" value="img" id="choose-img" @click="newNoteType">
        </label>
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note ? this.note.info.title : '',
            txt: this.note ? this.note.info.txt : ''
        }
    },
    
    methods: {
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt);
        },

        newNoteType(ev) {
            const selectedValue = ev.target.defaultValue;
            this.$emit('sendType', selectedValue);
        }
    },

    computed: {
        placeholderTxt() {
            const noteType = this.note.type;
            const placeholderTxt = '';
            switch(noteType) {
                case 'txt':
                    placeholderTxt = 'Take a note...'
                    break;
                case 'img':
                    placeholderTxt = 'Enter image URL'
                    break;
                default:
                    placeholderTxt = 'Take a note...'
            }
            return placeholderTxt;
        },

        created() {
            console.log(this.note);
        }
    }
}