import Vue from 'vue';
import demo from './demo.vue';

let vm = new Vue({
	render: h => h(demo)
}).$mount('#app')
