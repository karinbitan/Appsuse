// import { mailService } from "../services/mail-service";
import mailPreview from './mail-preview.cmp.js';

export default {
    props: ['mails'],
    template: `
    <section class="mail-list">
        <ul>
    <li v-for="mail in mails"><mail-preview/>{{mail}}</li>
        </ul>
    </section>
    `,
    components: mailPreview,
}