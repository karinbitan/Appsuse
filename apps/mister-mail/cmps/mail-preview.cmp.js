import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail-service.js";

export default {
    props: ['mail'],
    template: `
    <section class="mail-preview" @click="mailDetails('/mail/' +mail.id)">
    <ul class="flex space-between" :class="readUnRead" @click="markReadUnRead">
        <li><button class="starred-mail-btn" @click.stop="onStarredMail(mail.id)"><img :src="starUrl" /></button></li>
        <li class="from">Karin</li>
        <li class="subject">{{mail.subject}}</li>
        <li class="mail-message grey">{{mailText}}</li>
        <li class="sent-at">{{mail.sentAt}}</li>
    </ul>
    </section>
    `,
    data() {
        return {
            isRead: this.mail.isRead,
        }
    },
    computed: {
        readUnRead() {
            return { read: this.isRead, unread: !this.isRead }
        },
        mailText() {
            const mail = this.mail.body;
            if (mail.length > 20) {
                return mail.substring(0, 20) + '...';
            } else return mail;
        },
        starUrl() {
            var starIcon = (!this.mail.isStarred) ? 'empty-star' : 'filled-star';
            return 'apps/mister-mail/assest/img/icon/' + starIcon + '.png'
        }
    },
    methods: {
        mailDetails(mailId) {
            this.$router.push(`${mailId}`);
        },
        markReadUnRead() {
            mailService.markAsRead(this.mail.id);
            eventBus.$emit('mail-readed');   
        },
        onStarredMail(mailId) {
            this.mail.isStarred = !this.mail.isStarred;
            mailService.starredMail(mailId, this.mail.isStarred)
            if (this.mail.isStarred) {
                eventBus.$emit('mail-starred');
                eventBus.$emit('show-msg', 'Mail starred');

            } else {
                eventBus.$emit('mail-unstarred');
                eventBus.$emit('show-msg', 'Mail unstarred');
            }
        }
    },
}