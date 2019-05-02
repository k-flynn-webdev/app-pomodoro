import Vue from 'vue'
import App from './App.vue'
import './register_service_worker.js'


Vue.config.productionTip = false


new Vue({
	render: h => h(App)
}).$mount('#app')
