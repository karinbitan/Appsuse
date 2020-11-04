import { eventBus } from './../../../services/event-bus-service.js';
import { mailService } from './../services/mail-service.js';

export default {
    template: `
    <section class="mail-details">
    <h2>{{mail.subject}}</h2>
    <p>{{mail.body}}</p>
    <button @click="onRemoveMail(mail.id)">X</button>
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
            this.$router.push('/mail')
        },
    }
}