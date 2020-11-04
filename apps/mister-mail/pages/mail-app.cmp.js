import { mailService } from './../services/mail-service.js';
import { eventBus } from './../../../services/event-bus-service.js';
import mailList from './../cmps/mail-list.cmp.js';
import sideNav from './../cmps/side-nav.cmp.js';

export default {
    template: `
    <section class="mail-app">
        <side-nav></side-nav>
        <mail-list :mails="mailsToShow"></mail-list>
    </section>
    `,
    components: {
        mailList,
        sideNav
    },
    data() {
        return {
            mails: [],
        }
    },
    computed: {
        mailsToShow() {
            return this.mails;

        }
    },
    created() {
        mailService.getMails().then(mails => {
            this.mails = mails;
        })
        eventBus.$on('mail-deleted', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
                console.log('deleted')
            })
        })
    }
}