import { mailService } from './../services/mail-service.js';
import mailList from './../cmps/mail-list.cmp.js';

export default {
    template: `
    <section class="mail-app">
        <h1>Mails!</h1>
        <mail-list :mails="mailsToShow"></mail-list>
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
            this.mails = mails;
            console.log(this.mails)
        } )
    }
}