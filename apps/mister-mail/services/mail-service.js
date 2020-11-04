import { utilService } from './../../../services/util-service.js'

var gMails;
const STORAGE_KEY = 'mails';

export const mailService = {
    createMail,
    createMails,
    getMails
}


function createMail(subject, body) {
    var mail = {
        subject,
        body,
        isRead: false,
        sentAt: Date.now()
    }
    return mail;
}

function createMails() {
    var mails = utilService.loadFromStorage(STORAGE_KEY);
    if (!mails) {
        var mail = createMail('Wassap?', 'Wanna eat pizza?');
        mails.push(mail);
        utilService.storeToStorage(STORAGE_KEY, mails);
    }
    return mails;
}

function getMails() {
    return Promise.resolve(gMails);
}
// {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594}