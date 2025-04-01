<!-- PageTransition.vue -->
<template>
	<div>
		<div
				:class="[
        'fixed inset-x-0 z-50 bg-black transition-all duration-500 ease-in-out',
        transitionClass
      ]"
		></div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'PageTransition',
	data() {
		return {
			transitionClass: 'h-full bottom-0 opacity-100'
		}
	},
	created() {
		this.$router.beforeEach((to, from, next) => {
			this.transitionClass = 'h-full bottom-0 opacity-100'
			setTimeout(() => {
				next()
			}, 300)
		})

		this.$router.afterEach(() => {
			setTimeout(() => {
				this.transitionClass = 'h-0 bottom-0 opacity-0'
			}, 300)
		})
	}
}
</script>