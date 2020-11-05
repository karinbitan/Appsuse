import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes,
    getNoteById,
    updateInStorage,
    youtubeParser
}

var notes = [];
const STORAGE_KEY = 'notes';

function createNote(noteType = 'txt') {
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
    saveNotesToStorage();
}

function getNotes() {
    return utilService.loadFromStorage(STORAGE_KEY);;
}

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function saveNotesToStorage() {
    utilService.storeToStorage(STORAGE_KEY, notes);
}

function getNoteById(noteId) {
    const note = notes.find(note => note.id === noteId);
    return  note;
}

function updateInStorage(noteId, editedNote) {
    var noteToUpdate = getNoteById(noteId);
    noteToUpdate = editedNote;
    saveNotesToStorage();
}