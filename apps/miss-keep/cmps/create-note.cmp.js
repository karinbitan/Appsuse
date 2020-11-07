export default {
    template: `
     <form @submit.prevent="saveNote" class="create-note flex-column align-center">
        <input type="text" name="title" placeholder="Add Title" v-model="title" @blur="reportVal">
        <textarea name="txt" cols="50" v-model="txt" @blur="reportVal" :placeholder="placeholderTxt"></textarea>
        <div class="choose-type flex">
            <div>
                <input type="radio" name="choose-type" value="txt" id="choose-txt" @click="newNoteType" checked="true" hidden>
                <label for="choose-txt"><i class="fas fa-font"></i></label>
            </div>
            <div>
                <input type="radio" name="choose-type" value="img" id="choose-img" @click="newNoteType" hidden>
                <label for="choose-img"><i class="fas fa-image"></i></label>
            </div>
            <div>
                <input type="radio" name="choose-type" value="todo" id="choose-todo" @click="newNoteType" hidden>
                <label for="choose-todo"><i class="fas fa-list"></i></label>
            </div>
            <div>
                <input type="radio" name="choose-type" value="video" id="choose-video" @click="newNoteType" hidden>
                <label for="choose-video"><i class="fab fa-youtube"></i></label>
            </div>
        </div>
        <button>Add Note</button>
     </form>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note ? this.note.info.title : '',
            txt: this.note ? this.note.info.txt : '',
            type: this.note ? this.note.type : ''
        }
    },
    
    methods: {
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt);
        },

        newNoteType(ev) {
            const selectedValue = ev.target.defaultValue;
            this.$emit('sendType', selectedValue);
        },

        saveNote() {
            this.$emit('sendNote', this.note);
            this.clearInput();
        },

        clearInput() {
            this.title = '';
            this.txt = '';
        }
    },

    computed: {
        placeholderTxt() {
            const noteType = this.note ? this.note.type : 'note-txt';
            var placeholderTxt = '';
            switch(noteType) {
                case 'note-txt':
                    placeholderTxt = 'Take a note...'
                    break;
                case 'note-img':
                    placeholderTxt = 'Enter image URL'
                    break;
                case 'note-video':
                    placeholderTxt = 'Enter video URL'
                    break;
                case 'note-todo':
                    placeholderTxt = 'Write your to do list, seperated with ","'
                    break;
                default:
                    placeholderTxt = 'Take a note...'
            }
            return placeholderTxt;
        },

        created() {
    
        }
    }
}