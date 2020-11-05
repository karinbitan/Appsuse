import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
    <section v-show="msg.txt" class="user-msg">
    <h3>{{msg.txt}}</h3>
    <button @click="msg.txt=null">x</button>
    </section>
    `,
    data(){
        return {
            msg:{
                txt: null,
                type: null
            }
        }
    },
    created(){
        eventBus.$on('show-msg', msg => {
            this.msg.txt = msg;
            setTimeout(()=>{
                this.msg.txt = null;
            }, 2000)
        })
    }
}