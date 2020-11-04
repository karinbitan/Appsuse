const STORAGE_KEY = 'mails';
const gMails = createMails();

import { utilService } from './../../../services/util-service.js'

export const mailService = {
    createMail,
    createMails,
    getMails
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
    // var mails = utilService.loadFromStorage(STORAGE_KEY);
    var mails = []
    console.log(mails)
    mails.push(createMail('Wassap?', 'Wanna eat pizza?'));
    mails.push(createMail('Sap?', 'Wanna eat vegan burger?'));
    mails.push(createMail('Hey!', 'Wanna build websites?'));
    // if (!mails) {
    //     var mail = createMail('Wassap?', 'Wanna eat pizza?');
    //     mails.push(mail);
    //     utilService.storeToStorage(STORAGE_KEY, mails);
    // }
    return mails;
}

function getMails() {
    return Promise.resolve(gMails);
}
// {subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt : 1551133930594}