

export default {
    props: ['mail'],
    template: `
    <section class="mail-preview">
    <ul class="flex space-between" :class="unRead">
        <li>Karin</li>
        <li>{{mail.subject}}</li>
        <!-- <li>{{mail.body}}</li> -->
        <li>{{mail.sentAt}}</li>
    </ul>
    </section>
    `,
    data() {
        return {
            isRead: true,
        }
    },
    computed: {
        unRead() {
            return { unread: !this.isRead }
        }
    }
}