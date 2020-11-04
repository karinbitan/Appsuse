import homePage from './pages/home-page.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import mailApp from './pages/mail-app.cmp.js';

const routes = [
{
    path: '/',
    component: homePage
},
{
    path: '/keep-app',
    component: keepApp
},
{
    path: 'mail-app',
    component: mailApp
}
]

export const ourRouter = new VueRouter({ routes })

