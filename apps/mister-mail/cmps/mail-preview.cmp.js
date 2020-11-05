

export default {
    props: ['mail'],
    template: `
    <section class="mail-preview" @click="bookDetails('/mail/' +mail.id)">
    <ul class="flex space-between" :class="readUnRead" @click="isRead = !isRead">
        <li>Karin</li>
        <li>{{mail.subject}}</li>
        <li class="previewText">{{mailText}}</li>
        <li>{{mail.sentAt}}</li>
    </ul>
    </section>
    `,
    data() {
        return {
            isRead: false,
        }
    },
    computed: {
        readUnRead() {
            return { read: this.isRead === true, unread: !this.isRead }
        },
        mailText() {
            const mail = this.mail.body;
            if (mail.length > 20) {
              return mail.substring(0, 20) + '...';
            } else return mail;
          },
    },
    methods: {
        bookDetails(mailId){
            this.$router.push(`${mailId}`)
        }
    }
}