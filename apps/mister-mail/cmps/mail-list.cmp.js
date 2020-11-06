import { mailService } from "../services/mail-service.js";
import mailPreview from './mail-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    props: {
        starredOnly: {
            type: Boolean,
            default: false
        }
    },
    template: `
    <section class="mail-list">
        <!-- <ul class="mail-list-header flex">
            <li>Priority</li>
            <li>From</li>
            <li>Subject</li>
            <li>Sent at</li>
        </ul> -->
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
            // if (this.starredOnly) return this.mails.filter((mail) => {
            //     return mail.isStarred;
            // })
            if (this.filterBy === null) return this.mails;
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
            })
        }
    },
    created() {
        mailService.getMails(this.starredOnly).then(mails => {
            this.mails = mails;
        }),
        eventBus.$on('mail-deleted', () => {
            mailService.getMails(this.starredOnly).then(mails => {
                this.mails = mails;
            })
        }),
        eventBus.$on('mail-added', () => {
            mailService.getMails(this.starredOnly).then(mails => {
                this.mails = mails;
            })
        }),
        eventBus.$on('filtered', (filterBy) => {
            this.filterBy = filterBy;
        })
    },
    components: {
        mailPreview
    }
}