import { mailService } from "../services/mail-service.js";
import mailPreview from './mail-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
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
            filterBy: null,
            starredOnly: false,
        }
    },
    computed: {
        mailsToShow() {
            if (this.filterBy === null) {
                return this.mails;
            }
            const bySubject = this.filterBy.bySubject.toLowerCase();
            return this.mails.filter((mail) => {
                var isRead = this.filterBy.readUnRead === 'Read' ? true : false;
                var isAll = this.filterBy.readUnRead === 'All';
                return mail.subject.toLowerCase().includes(bySubject)
                // &&
                // (this.starredOnly === mail.isStarred)
                && (
                        ((isRead && mail.isRead) ||
                        (!isRead && !mail.isRead))
                        || isAll
                    )
            })
        }
    },
    created() {
        mailService.getMails().then(mails => {
            this.mails = mails;
        }),
        eventBus.$on('mail-deleted', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
            })
        }),
        eventBus.$on('mail-added', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
            })
        }),
        eventBus.$on('filtered', (filterBy) => {
            this.filterBy = filterBy;
        }),
        // }),
        // eventBus.$on('mail-starred', () => {
        //     mailService.getMails().then(mails => {
        //         this.mails = mails;
        //     })
        // }),
        // eventBus.$on('mail-unstarred', () => {
        //     mailService.getMails().then(mails => {
        //         this.mails = mails;
        //     })
        eventBus.$on('starred-only', () =>{
            this.starredOnly = true;
        })
    },
    components: {
        mailPreview
    }
}