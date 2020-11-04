import { mailService } from './../services/mail-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import mailList from './../cmps/mail-list.cmp.js';
import sideNav from './../cmps/side-nav.cmp.js';
import mailFilter from './../cmps/mail-filter.cmp.js';


export default {
    template: `
    <section class="mail-app flex">
        <mail-filter @filtered="setFilter" />
        <side-nav />
        <mail-list :mails="mailsToShow" />
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
            if(this.filterBy === null ) return this.mails;
            const byName = this.filterBy.byName.toLowerCase();
            return this.mails.filter( (mail) => {
                return mail.subject.toLowerCase().include(byName);
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
        setFilter(filterBy){
            this.filterBy = filterBy;
        }
    }
}