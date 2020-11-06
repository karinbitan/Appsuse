const STORAGE_KEY = 'mails';
const gMails = createMails();

import { utilService } from './../../../services/util-service.js'

export const mailService = {
    createMail,
    createMails,
    getMails,
    getMailById,
    removeMail,
    addMail,
    markAsRead,
    starredMail
}


function createMail(subject, body) {
    const mail = {
        id: utilService.makeId(),
        subject,
        body,
        from: 'Karin',
        to: 'Karin',
        isRead: false,
        isStarred: false,
        sentAt: utilService.getTime()
    }
    return mail;
}

function createMails() {
    var mails = utilService.loadFromStorage(STORAGE_KEY);

    if (!mails || !mails.length) {
        mails = [];
        mails.push(createMail('Wassap?','Wanna eat pizza?'));
        mails.push(createMail('Sap?', 'Wanna eat vegan burger?'));
        mails.push(createMail('Hey!', 'Wanna build websites?'));
    }
    utilService.storeToStorage(STORAGE_KEY, mails);
    return mails;
}

function getMails() {
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    return Promise.resolve(mails);
}

function getMailById(mailId) {
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    return Promise.resolve(mails.find((mail) => {
        return mail.id === mailId;
    }))
}

function removeMail(mailId) {
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    mails = mails.filter((mail) => {
        return mail.id !== mailId;
    })
    utilService.storeToStorage(STORAGE_KEY, mails);
}

function addMail(subject, body) {
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    var mail = createMail(subject, body)
    mails.unshift(mail);
    utilService.storeToStorage(STORAGE_KEY, mails);
}

function markAsRead(mailId, mark = true){
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    mails.map( mail => {
        if (mail.id != mailId) return mail;
        mail.isRead = mark;
        return mail;
    } )
    utilService.storeToStorage(STORAGE_KEY, mails);
}

function starredMail(mailId, starred){
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    mails.map( mail => {
        if (mail.id != mailId) return mail;
        mail.isStarred = starred;
        return mail;
    } )
    utilService.storeToStorage(STORAGE_KEY, mails);
}