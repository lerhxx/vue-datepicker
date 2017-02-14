import Vue from 'vue';
import calendar from './calendar.vue';

let vm = new Vue({
	render: h => h(calendar)
}).$mount('#app')