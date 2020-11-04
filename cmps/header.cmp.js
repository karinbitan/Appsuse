
export default {
    template: `
    <header class="flex space-between">
        <div class="logo" @click="goHome">
            <h1>Appsus <span><i class="fas fa-horse"></i></span></h1>
        </div>
        <nav class="flex align-center space-between">
            <router-link to="/mail" exact>Mail</router-link>
            <router-link to="/keep" exact>Keep</router-link>
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