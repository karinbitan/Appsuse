export default {
    template: `
    <section class="create-note flex-column align-center">
        <input type="text" name="title" placeholder="Add Title" v-model="title" @blur="reportVal">
        <textarea name="txt" cols="50" v-model="txt" @blur="reportVal"></textarea>
        <label for="choose-txt">txt
            <input type="radio" name="choose-type" value="txt" id="choose-txt" @click="newNoteType" checked="true">
        </label>
        <label for="choose-img">img
            <input type="radio" name="choose-type" value="img" id="choose-img" @click="newNoteType">
        </label>
        <label for="choose-todo">todo
            <input type="radio" name="choose-type" value="todo" id="choose-todo" @click="newNoteType">
        </label>
        <label for="choose-video">video
            <input type="radio" name="choose-type" value="video" id="choose-video" @click="newNoteType">
        </label>
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note ? this.note.info.title : '',
            txt: this.note ? this.note.info.txt : '',
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
                case 'video':
                    placeholderTxt = 'Enter video URL'
                    break;
                case 'todo':
                    placeholderTxt = 'Write your to do list, seperated with ","'
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