import { mailService } from "../services/mail-service.js";
import mailPreview from './mail-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    // props: ['mails'],
    template: `
    <section class="mail-list">
        <div v-for="mail in mailsToShow">
            <mail-preview :mail="mail" />  
        </div>
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
            // FIX the empty string
            if (this.filterBy === null) {
                return this.mails;
            }
            const bySubject = this.filterBy.bySubject.toLowerCase();
            return this.mails.filter((mail) => {
                var isRead = this.filterBy.readUnRead === 'Read' ? true : false;
                var isAll = this.filterBy.readUnRead === 'All';
                return mail.subject.toLowerCase().includes(bySubject)
                && (
                    
                        ((isRead && mail.isRead) ||
                        (!isRead && !mail.isRead))
                        || isAll
                    )
                //  && ((this.filterBy.readUnread === 'Read' && mail.isRead)
                //     || (this.filterBy.readUnread === 'Unread' && !mail.isRead))
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
        eventBus.$on('filtered', (filterBy) => {
            this.filterBy = filterBy;
        })
    },
    components: {
        mailPreview
    }
}