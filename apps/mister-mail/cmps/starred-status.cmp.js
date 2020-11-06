import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail-service.js";

export default {
    template: `
    <section class="starred-status">
    {{starredCound}}
    </section>
    `,
    data() {
        return {
            mails: [],
            starredMails: 0
        }
    },
    computed: {
        starredCound() {
            this.starredMails = this.mails.filter((mail) => {
                return mail.isStarred === true;
            })
            if (this.starredMails == 0) return '';
            return this.starredMails.length;
        }
    },
    created() {
        mailService.getMails().then(mails => {
            this.mails = mails
        }),
            eventBus.$on('mail-starred', () => {
                mailService.getMails().then(mails => {
                    this.mails = mails;
                })
            }),
            eventBus.$on('mail-unstarred', () => {
                mailService.getMails().then(mails => {
                    this.mails = mails;
                })
            })
    }
}