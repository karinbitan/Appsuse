import { eventBus } from './../../../services/event-bus-service.js';
import { mailService } from './../services/mail-service.js';

export default {
    template: `
    <section class="mail-details">
        <h2 class="subject">{{mail.subject}}</h2>
        <button class="delete-mail" @click="onRemoveMail(mail.id)"><img src="apps/mister-mail/assets/img/icon/garbage.png" /></button>
        <button class="starred-mail" @click="onStarredMail(mail.id)"><img :src="starUrl" /></button>
        <p>{{mail.from}} <span class="grey"> &lt;{{mail.from}}@mister-bit.com&gt;</span></p>
        <p>Sent at: {{mail.sentAt}}<p>
            <hr>
        <p>{{mail.body}}</p>
    </section>
    `,
    data() {
        return {
            mail: {},
            isStarred: false,
        }
    },
    created() {
        const id = this.$route.params.mailId;
        mailService.getMailById(id)
            .then((mail) => {
                this.mail = mail
                this.isStarred = mail.isStarred
            });
    },
    methods: {
        onRemoveMail(mailId) {
            mailService.removeMail(mailId);
            eventBus.$emit('mail-deleted');
            eventBus.$emit('show-msg', 'Mail deleted')
            this.$router.push('/mail')
        },
        onStarredMail(mailId) {
            this.isStarred = !this.isStarred;
            mailService.starredMail(mailId, this.isStarred)
            if (this.isStarred) {
                eventBus.$emit('mail-starred');
                eventBus.$emit('show-msg', 'Mail starred');
            } else {
                eventBus.$emit('mail-unstarred');
                eventBus.$emit('show-msg', 'Mail unstarred');
            }
        }
    },
    computed: {
        starUrl() {
            var starIcon = (!this.isStarred) ? 'empty-star' : 'filled-star';
            return 'apps/mister-mail/assets/img/icon/' + starIcon + '.png'

        }
    }
}