import homePage from './pages/home-page.cmp.js';
<<<<<<< HEAD
import keepApp from './apps/miss-keep/keep-app.cmp.js';
import mailApp from './pages/mail-app.cmp.js';
=======
import keepApp from './pages/keep-app.cmp.js';
import mailApp from './apps/mister-mail/pages/mail-app.cmp.js';
>>>>>>> 693f2999fad8e8e07fa84dace75d686c03b214fc
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

