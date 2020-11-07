import {utilService} from '../../../services/util-service.js';

export default {
    template: `
    <section class="note-todo">
        <input type="text" name="title" placeholder="Title" v-model="title" @change="reportVal">
        <span class="edit-icon"><i class="fas fa-edit"></i></span>
        <ul class="to-do-list">
            <li v-for="toDo in txt" :key="toDo.toDoId">
                <input type="checkbox" name="check-is-done" :id="toDo.toDoId" @change="toggleIsDone">
                <input type="text" v-model="toDo.toDoTxt" class="li-input" @change="reportVal" v-bind:class="{done: toDo.isDone}">
                <button class="remove-todo" @click="removeTodo" :id="toDo.toDoId"><i class="fas fa-trash-alt"></i></button>
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
            console.log(this.txt)
        },

        removeNote() {
            this.$emit('removeNote', this.note.id);
        },

        toggleIsDone(ev) {
            const id = ev.target.id;
            let idx = this.txt.findIndex(toDo => toDo.toDoId === id);
            if (ev.target.checked) this.txt[idx].isDone = true;
            else this.txt[idx].isDone = false;
            
        },
        removeTodo(ev) {
            const id = ev.target.id;
            if(id) {
                let idx = this.txt.findIndex(toDo => toDo.toDoId === id);
                this.txt.splice(idx, 1);
            }
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
