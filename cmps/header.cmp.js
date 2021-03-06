
export default {
    template: `
    <header class="main-header flex space-between">
        <div class="logo" @click="goHome">
            <h1><span class="logo-txt">Appsus </span><span><i class="fas fa-horse"></i></span></h1>
        </div>
        <nav class="flex align-center space-between">
            <router-link to="/mail" exact>Mail</router-link>
            <a class="seperator">|</a>
            <router-link to="/keep" exact>Keep</router-link>
            <a class="seperator">|</a>
            <router-link to="/book" exact>Books</router-link>
        </nav>
    </header>
    `,
	
	methods: {
		goHome() {
            this.$router.push(`/`);
        }
	}
}