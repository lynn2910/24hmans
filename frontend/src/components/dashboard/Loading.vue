<template>
	<div>
		<div class="fixed top-0 left-0 w-screen h-screen backdrop-blur"></div>
		<div class="fixed top-0 left-0 w-screen h-screen flex flex-row items-center content-center justify-center">

			<div class="bg-dark p-5 rounded-xl">
				<h1>{{ title }}</h1>
				<p class="italic text-sm opacity-50">{{ $t("tools.loading.waiting") }}</p>

				<p></p>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: "Loading",
	props: {
		title: String,
		indicator: String,
		step: Number,
		maxStep: Number,
	}
}
</script>
