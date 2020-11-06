import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
        <nav class="side-nav">
        <div @click="composeMail">Compose <img src="apps/mister-mail/assest/img/icon/add.png" /></div>
            <ul class="flex-column space-evenly">
                <li @click="backToMain">Inbox <img src="apps/mister-mail/assest/img/icon/mail-icon.png" /></li>
                <li @click="starredMails">Starred <img src="apps/mister-mail/assest/img/icon/filled-star.png" /></li>
                <li>Sent Mails <img src="apps/mister-mail/assest/img/icon/sent-mail.jpg" /></li>
                <li>Drafts <img src="apps/mister-mail/assest/img/icon/draft-mail.png" /></li>
            </ul>
        </nav>
    `,
    methods: {
        composeMail() {
            this.$router.push('/mail/compose')
        },
        backToMain() {
            this.$router.push('/mail');
        },
        starredMails(){
            eventBus.$emit('starred-only');
        }
    },
}
