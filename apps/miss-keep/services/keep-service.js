import {utilService} from '../../../services/util-service.js';

export const keepService = {
    createNote,
    addToNotes,
    getNotes,
    youtubeParser
}

var notes = [];

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
}

function getNotes() {
    return notes;
}

function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}