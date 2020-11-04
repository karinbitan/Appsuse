import { ourRouter } from './routes.js'
import mainHeader from './cmps/header.cmp.js';
import mainFooter from './cmps/footer.cmp.js';

const options = {
    el: '#app',
    router: ourRouter,
    template: `
    <section>
        <main-header class="main-header"></main-header>
        <h1>Puki</h1>
        <main>
            <router-view></router-view>
        </main>
        <main-footer class="main-footer"></main-footer>
    </section> 
    `,
    components: {
        mainHeader,
        mainFooter
    }
}

const app = new Vue(options);