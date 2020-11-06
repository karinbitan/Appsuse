import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail-service.js";

export default {
    template: `
    <section class="mail-status">
        {{unreadCount}}
    </section>
    `,
    data() {
        return {
            mails: [],
            unreadMails: 0
        }
    },
    computed: {
        unreadCount() {
            this.unreadMails = this.mails.filter((mail) => {
                return mail.isRead === false;
            })
            if(this.unreadMails.length == 0) return '';
            return this.unreadMails.length;
        }
    },
    created() {
        mailService.getMails().then(mails => {
            this.mails = mails;
        })
        eventBus.$on('mail-readed', () => {
            mailService.getMails().then(mails => {
                this.mails = mails;
            })
        }),
            eventBus.$on('mail-added', () => {
                mailService.getMails().then(mails => {
                    this.mails = mails;
                })
            })
    }
}