// import { mailService } from "../services/mail-service";
import mailPreview from './mail-preview.cmp.js';
import mailCompose from './mail-compose.cmp.js';

export default {
    props: ['mails'],
    template: `
    <section class="mail-list">
        <div v-for="mail in mails">
            <mail-preview :mail="mail" />  
        </div>
            <mail-compose /> 
    </section>
    `,
    components: {
        mailPreview,
        mailCompose
    }
}