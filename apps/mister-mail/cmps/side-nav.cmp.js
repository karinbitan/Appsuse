import mailStatus from './mail-status.cmp.js';
import starredStatus from './starred-status.cmp.js';

export default {
    template: `
        <nav class="side-nav">
        <a href="javascript:void(0);" class="icon" @click="myFunction">
    <i class="fa fa-bars"></i>
  </a>
  <ul class="topnav" id="side-nav-list">
    <li class="compose-mail-btn" @click="composeMail">Compose 
        <img src="apps/mister-mail/assest/img/icon/add.png" /></li>
                <li @click="backToMain">Inbox <img src="apps/mister-mail/assest/img/icon/mail-icon.png" />
                <mail-status /></li>
                <li @click="starredMails">Starred <img src="apps/mister-mail/assest/img/icon/filled-star.png" />
                <starred-status /></li>
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
        starredMails() {
            this.$router.push('/mail/starred');
        },
        myFunction() {
            var x = document.getElementById("side-nav-list");
            if (x.className === "topnav") {
              x.className += " responsive";
            } else {
              x.className = "topnav";
            }
        }
    },
    components: {
        mailStatus,
        starredStatus
    }
}
