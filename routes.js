import homePage from './pages/home-page.cmp.js';
import keepApp from './apps/miss-keep/keep-app.cmp.js';
import mailApp from './apps/mister-mail/pages/mail-app.cmp.js';
import bookApp from './pages/book-app.cmp.js';

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
    },
    {
        path: '/book',
        component: bookApp
    }

]

export const ourRouter = new VueRouter({ routes });

