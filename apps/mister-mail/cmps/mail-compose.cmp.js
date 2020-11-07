import { mailService } from './../services/mail-service.js';
import {eventBus} from './../../../services/event-bus-service.js';

export default {
    template: `
    <section class="mail-compose">
        <form @submit.prevent="onAddMail" class="new-message">
            <h2 class="new-message-header">New message</h2>
            <div class="new-message-text flex-column">
                    <input type="text" placeholder="To" />
                    <input type="text" placeholder="Subject" v-model="mail.subject" />
                    <textarea class="mail-body" v-model="mail.body"></textarea>
                </div>
                <button class="send-mail">Send</button>
            </form>
            <button class="delete-draft"><img src="apps/mister-mail/assets/img/icon/garbage.png" /></button>
        </section>
    `,
    data() {
        return {
            mail: {
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        onAddMail() {
            var subject = this.mail.subject;
            var body = this.mail.body;
            mailService.addMail(subject, body);
            eventBus.$emit('mail-added');
            eventBus.$emit('show-msg', 'Mail sent!')
            this.$router.push('/mail')
        }
    }
}