import {utilService} from '../../../services/util-service.js';
import noteTxtCmp from '../cmps/note-txt.cmp.js';

export const keepService = {
    createNote
}

var notes = [];

function createNote() {
    let newNote = {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {title:'', txt: ''},
        style: {}
    }
    notes.push(newNote);
    return newNote;
}