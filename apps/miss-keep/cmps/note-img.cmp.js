
export default {
    template: `
    <section>
        <img src="apps/mister-mail/assest/img/icon/mail-icon.png" width="50" height="50" />
    </section>
    `,

    props: ['note'],

    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt 
        }
    },
    methods: {
    }
}