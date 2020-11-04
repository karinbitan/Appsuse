const STORAGE_KEY = 'mails';
const gMails = createMails();

import { utilService } from './../../../services/util-service.js'

export const mailService = {
    createMail,
    createMails,
    getMails,
    getMailById,
    removeMail
}


function createMail(subject, body) {
    const mail = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.getTime()
    }
    return mail;
}

function createMails() {
    var mails = utilService.loadFromStorage(STORAGE_KEY);

    if (!mails || !mails.length) {
        mails = [];
        mails.push(createMail('Wassap?', 'Wanna eat pizza?'));
        mails.push(createMail('Sap?', 'Wanna eat vegan burger?'));
        mails.push(createMail('Hey!', 'Wanna build websites?'));
    }
    utilService.storeToStorage(STORAGE_KEY, mails);
    console.log(mails)
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