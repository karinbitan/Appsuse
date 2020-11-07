import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes,
    getNoteById,
    removeFromStorage,
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
    notes = utilService.loadFromStorage(STORAGE_KEY);

    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'note-img',
                isPinned: false,
                info: {title: 'BNA', txt: 'https://cdn.thenationroar.com/wp-content/uploads/2020/05/BNA-Episode-2-Release-Date-Preview-and-Spoilers-696x404-credit-pinterest.jpg'},
                style: {}
            },
            
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: {title: 'The KKK', txt: 'Took my baby away'},
                style: {}
            },
            
            // {
            //     id: utilService.makeId(),
            //     type: 'note-video',
            //     isPinned: false,
            //     info: {title: 'Fiona!', txt: 'https://youtu.be/emXYPRlVBas'},
            //     style: {}
            // }
        ];
    }
    utilService.storeToStorage(STORAGE_KEY, notes);
    return notes;
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
   return notes.find(note => note.id === noteId);
}

function findNoteIdx(noteId) {
  let noteIdx = notes.findIndex(note => note.id === noteId);
    return noteIdx;
}

function removeFromStorage(noteId) {
    var idx = findNoteIdx(noteId);
    notes.splice(idx, 1);
    saveNotesToStorage();
}

function updateInStorage(noteId, editedNote) {
    var noteToUpdate = getNoteById(noteId);
    noteToUpdate.info = editedNote.info;
    saveNotesToStorage();
}