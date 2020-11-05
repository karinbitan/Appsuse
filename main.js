import { ourRouter } from './routes.js'
import mainHeader from './cmps/header.cmp.js';
import mainFooter from './cmps/footer.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
    el: '#app',
    router: ourRouter,
    template: `
    <section>
        <main-header class="main-header"></main-header>
        <user-msg />
        <main>
            <router-view></router-view>
        </main>
        <main-footer class="main-footer"></main-footer>
    </section> 
    `,
    components: {
        mainHeader,
        mainFooter,
        userMsg
    }
}

const app = new Vue(options);