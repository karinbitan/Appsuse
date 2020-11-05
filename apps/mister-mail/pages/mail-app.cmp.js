import { mailService } from './../services/mail-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import mailList from './../cmps/mail-list.cmp.js';
import sideNav from './../cmps/side-nav.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';


export default {
    template: `
    <section class="mail-app flex-column">
        <mail-filter @filtered="setFilter" />
        <section class="mail-container flex">
            <side-nav />
            <mail-list :mails="mailsToShow" />
        </section>
    </section>
    `,
    components: {
        mailList,
        sideNav,
        mailFilter
    },
    data() {
        return {
            mails: [],
            filterBy: null
        }
    },
    computed: {
        mailsToShow() {
            // FIX
            if (this.filterBy === null || (this.filterBy.text === null && this.filterBy.readUnread === 'All')) {
                return this.mails;
            }
            const bySubject = this.filterBy.bySubject.toLowerCase();
            return this.mails.filter((mail) => {
                return mail.subject.toLowerCase().includes(bySubject) && ((this.filterBy.readUnread === 'Read' && mail.isRead)
                || (this.filterBy.readUnread === 'Unread' && !mail.isUnread))
            })
        }
    },
    created() {
        mailService.getMails().then(mails => {
            this.mails = mails;
        })
        eventBus.$on('mail-deleted', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
            })
        })
        eventBus.$on('mail-added', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
            })
        })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    }
}