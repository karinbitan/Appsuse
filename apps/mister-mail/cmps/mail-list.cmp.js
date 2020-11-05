import { mailService } from "../services/mail-service.js";
import mailPreview from './mail-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    // props: ['mails'],
    template: `
    <section class="mail-list">
        <div v-for="mail in mails">
            <mail-preview :mail="mail" />  
        </div>
        <!-- <router-view /> -->
    </section>
    `,
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
                return mail.subject.toLowerCase().includes(bySubject)
                //  && ((this.filterBy.readUnread === 'Read' && mail.isRead)
                //     || (this.filterBy.readUnread === 'Unread' && !mail.isUnread))
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
            eventBus.$on('filtered2', (filterBy) => {
                this.filterBy = filterBy;
            })
        })
    },
    components: {
        mailPreview
    }
}