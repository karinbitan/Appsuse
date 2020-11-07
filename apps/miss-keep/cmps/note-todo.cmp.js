import {utilService} from '../../../services/util-service.js';

export default {
    template: `
    <section class="note-todo">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <span class="edit-icon"><i class="fas fa-edit"></i></span>
        <ul class="to-do-list">
            <li v-for="toDo in txt" :key="toDo.id">
                <input type="text" v-model="toDo.toDoTxt" class="li-input" @change="reportVal">
                <button class="remove-todo" @click="removeTodo" :id="toDo.id"><i class="fas fa-trash-alt"></i></button>
            </li>
        </ul>
        <button class="remove-note" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
        
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
        reportVal() {
            this.$emit('sendInfo', this.title, this.txt, this.note.id);
        },

        removeNote() {
            this.$emit('removeNote', this.note.id);
        },

        removeTodo(ev) {
            let idx = this.txt.findIndex(toDo => toDo.toDoId === toDo.id);
            console.log(ev)
            // this.txt.splice(idx, 1);
        }
    },

    computed: { 
        createToDoList() {
            var toDos = this.txt.split(',');
            this.txt = toDos.map(toDo => toDo = {
                toDoId: utilService.makeId(),
                toDoTxt: toDo,
                isDone: false})
        },
    },

    created() {
        this.createToDoList;
    }
}
