import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes
}

var notes = [];

function createNote() {
    let newNote = {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {title:'', txt:''},
        style: {}
    };
    return newNote;
}

function addToNotes(newNote) {
    notes.unshift(newNote);
}

function getNotes() {
    return notes;
}