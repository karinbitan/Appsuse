import { mailService } from './../services/mail-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import mailList from './../cmps/mail-list.cmp.js';
import sideNav from './../cmps/side-nav.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';
import mailCompose from './../cmps/mail-compose.cmp.js';


export default {
    template: `
    <section class="mail-app flex-column">
        <mail-filter />
        <section class="mail-container flex">
            <side-nav />
            <!-- <mail-list :mails="mailsToShow" /> -->
            <router-view></router-view>
            <mail-compose class="mail-compose" /> 
        </section>
    </section>
    `,
    components: {
        mailList,
        sideNav,
        mailFilter,
        mailCompose
    },
    data() {
        return {
            mails: [],
            filterBy: null
        }
    },
    computed: {
        // mailsToShow() {
        //     // FIX
        //     if (this.filterBy === null || (this.filterBy.text === null && this.filterBy.readUnread === 'All')) {
        //         return this.mails;
        //     }
        //     const bySubject = this.filterBy.bySubject.toLowerCase();
        //     return this.mails.filter((mail) => {
        //         return mail.subject.toLowerCase().includes(bySubject) && ((this.filterBy.readUnread === 'Read' && mail.isRead)
        //         || (this.filterBy.readUnread === 'Unread' && !mail.isUnread))
        //     })
        // }
    },
    // created() {

    // },
    methods: {
        // setFilter(filterBy) {
        //     this.filterBy = filterBy;
        // }
    }
}