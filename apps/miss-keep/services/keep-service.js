import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes
}

var notes = [];

function createNote(noteType = 'img') {
    let newNote = {
        id: utilService.makeId(),
        type: `note-${noteType}`,
        isPinned: false,
        info: {},
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