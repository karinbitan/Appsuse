import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes,
    getNoteById,
    removeFromStorage,
    updateInStorage,
    copyNote,
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
                info: {title: 'BNA', txt: 'https://i1.wp.com/decider.com/wp-content/uploads/2020/06/BNA-NETFLIX-REVIEW.png?quality=80&strip=all&ssl=1'},
                style: {}
            },
            
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: {title: 'The KKK', txt: 'Took my baby away'},
                style: {}
            },
            
            {
                id: utilService.makeId(),
                type: 'note-video',
                isPinned: false,
                info: {title: 'Fiona!', txt: 'https://youtu.be/emXYPRlVBas'},
                style: {}
            },

            {
                id: utilService.makeId(),
                type: 'note-todo',
                isPinned: false,
                info: {title: 'My To Dos', txt: 'do,did,done!'},
                style: {}
            },
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
  const noteIdx = notes.findIndex(note => note.id === noteId);
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

function copyNote(noteId) {
    const idx = findNoteIdx(noteId);
    let noteCopy = JSON.parse(JSON.stringify(notes[idx]));
    noteCopy.isPinned = true;
    notes.splice(idx, 1);
    addToNotes(noteCopy);
    saveNotesToStorage();
}