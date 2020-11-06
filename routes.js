import homePage from './pages/home-page.cmp.js';
import keepApp from './apps/miss-keep/keep-app.cmp.js';
import mailApp from './apps/mister-mail/pages/mail-app.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import mailDetails from './apps/mister-mail/cmps/mail-details.cmp.js';
import mailList from './apps/mister-mail/cmps/mail-list.cmp.js';
import mailCompose from './apps/mister-mail/cmps/mail-compose.cmp.js';
// import starredMails from './apps/mister-mail/cmps/starred-mails.cmp.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/mail',
        component: mailApp,
        children: [
            {
                path: '/',
                component: mailList
            },
            {
                path: 'compose',
                component: mailCompose
            },
            // {
            //     path: 'starred',
            //     component: starredMails
            // },
            {
                path: ':mailId',
                component: mailDetails
            },
            
        ]
    },
    {
        path: '/book',
        component: bookApp
    }

]

export const ourRouter = new VueRouter({ routes });

