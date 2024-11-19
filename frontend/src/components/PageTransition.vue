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
		// Hook into Vue Router navigation
		this.$router.beforeEach((to, from, next) => {
			// Start page out transition
			this.transitionClass = 'h-full bottom-0 opacity-100'

			// Allow slight delay for visual effect
			setTimeout(() => {
				next()
			}, 300)
		})

		this.$router.afterEach(() => {
			// Start transition out
			setTimeout(() => {
				this.transitionClass = 'h-0 bottom-0 opacity-0'
			}, 300)
		})
	}
}
</script>