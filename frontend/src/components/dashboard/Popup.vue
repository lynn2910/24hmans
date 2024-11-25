<template>
	<section class="absolute top-0 left-0 transition-all ease-in-out duration-700" @keydown.esc="emitCloseEvent">
		<div class="fixed top-0 left-0 w-screen h-screen backdrop-blur z-10"
				 @click="emitCloseEvent"></div>
		<div
				class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-row content-center items-center justify-center">
			<div class="bg-dark rounded-xl">
				<!-- head -->
				<div class="p-5 pb-2 flex flex-row items-center content-center justify-start">
					<h2 class="font-bold">{{ title }}</h2>
					<svg @click="emitCloseEvent"
							 xmlns="http://www.w3.org/2000/svg"
							 class="fill-white ml-auto cursor-pointer hover:scale-150"
							 width="24" height="24" viewBox="0 0 24 24">
						<path
								d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
					</svg>
				</div>
				<!-- body -->
				<div class="p-5 pt-2">
					<slot></slot>
				</div>

			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "Popup",
	props: {
		title: String
	},
	methods: {
		emitCloseEvent() {
			this.$emit("close")
		}
	}
}
</script>