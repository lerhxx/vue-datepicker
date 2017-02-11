<template>
	<div>
		<calendar :theme='theme'></calendar>
		<input type='color' v-model='theme' @change='changeTheme'/>
	</div>
</template>

<script>
	import calendar from './calendar.vue';

	export default {
		data() {
			return {
				theme: '#e57373'
			}
		},
		methods: {
			changeTheme() {
				console.log(this.theme)
			}
		},
		components: {
			calendar
		}
	}
</script>