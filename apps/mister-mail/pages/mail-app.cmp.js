import { mailService } from './../services/mail-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import mailList from './../cmps/mail-list.cmp.js';
import sideNav from './../cmps/side-nav.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';


export default {
    template: `
    <section class="mail-app flex-column">
        <mail-filter />
        <section class="mail-container flex">
            <side-nav />
            <router-view :key="$route.path"></router-view>
        </section>
    </section>
    `,
    components: {
        mailList,
        sideNav,
        mailFilter,
    },
}