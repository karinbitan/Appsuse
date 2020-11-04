import { mailService } from './../apps/mister-mail/services/mail-service.js';
import mailList from './../apps/mister-mail/cmps/mail-list.cmp.js';

export default {
    template: `
    <section class="mail-app">
        <h1>Mails!</h1>
        <mail-list :mails="getMails"></mail-list>
    </section>
    `,
    components: {
        mailList,
    },
    data(){
        return {
            mails: [],
        }
    },
    computed: {
        mailsToShow(){
            return this.mails;
        }
    },
    created(){
        mailService.getMails().then( mails =>{
            this.mails = mails
        } )
    }
}