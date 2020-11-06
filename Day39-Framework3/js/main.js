import {myRouter} from './routes.js';
import bookHeader from './cmps/book-header.cmp.js';

const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
    <book-header />
        <router-view></router-view>
    </section>
    `,

    components: {
        bookHeader
    }
}

const app = new Vue(options);