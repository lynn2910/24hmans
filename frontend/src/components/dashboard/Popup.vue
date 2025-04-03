<template>
	<section
			class="fixed inset-0 transition-all duration-700 z-50 min-w-32"
			@keydown.esc="emitCloseEvent"
	>
		<div
				class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 cursor-pointer"
				@click="emitCloseEvent"
		></div>
		<div
				class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col"
				:class="{
        'w-full h-screen': fullPage,
        'rounded-xl border border-gray-700 shadow-2xl': !fullPage,
      }"
		>
			<div
					class="overflow-y-auto"
					:class="{ 'rounded-xl': !fullPage, [bg]: true }"
			>
				<div
						class="sticky top-0 z-10 bg-gray-800 w-full p-4 flex flex-row items-center justify-between"
						:class="fullPage ? 'rounded-none' : 'rounded-t-xl'"
				>
					<h2 class="text-lg font-semibold text-white">{{ title }}</h2>
					<button
							@click="emitCloseEvent"
							class="text-gray-300 hover:text-white transition-transform transform hover:scale-125"
					>
						<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
						>
							<path
									d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
							></path>
						</svg>
					</button>
				</div>
				<div
						class="w-full"
						:class="{ 'p-6': !fullPage }"
						:style="{ height: fullPage ? 'calc(100vh - 4rem)' : 'auto' }"
				>
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
		title: String,
		fullPage: {
			type: Boolean,
			default: false,
		},
		bg: {
			type: String,
			default: "bg-gray-800",
		},
	},
	methods: {
		emitCloseEvent() {
			this.$emit("close");
		},
	},
};
</script>
