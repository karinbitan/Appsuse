import { eventBus } from './../../../services/event-bus-service.js';
import { mailService } from './../services/mail-service.js';

export default {
    template: `
    <section class="mail-details">
        <h2 class="subject">{{mail.subject}}</h2>
        <button class="delete-mail" @click="onRemoveMail(mail.id)"><img src="apps/mister-mail/assest/img/icon/garbage.png" /></button>
    <p>{{mail.body}}</p>
    </section>
    `,
    data() {
        return {
            mail: '',
        }
    },
    created() {
        const id = this.$route.params.mailId;
        mailService.getMailById(id)
            .then((mail) => this.mail = mail);
        console.log('created')
    },
    methods: {
        onRemoveMail(mailId) {
            mailService.removeMail(mailId);
            eventBus.$emit('mail-deleted');
            eventBus.$emit('show-msg', 'Mail deleted')
            this.$router.push('/mail')
        },
    }
}