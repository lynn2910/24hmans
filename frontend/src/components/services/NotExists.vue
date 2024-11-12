<script>
export default {
	name: "NotExists",
	props: {
		title: String,
		description: String,
		routeBackURL: String,
		routeBack: String
	}
}
</script>

<template>
	<div class="w-screen h-screen flex items-center justify-center">
		<div
				class="w-[50%] h-[30%] border-2 border-orange-600 rounded-xl p-3 py-5 bg-orange-600 bg-opacity-10 text-center flex flex-col items-center justify-between">
			<h1 class="text-2xl font-bold">{{ title }}</h1>
			<p class="m-auto text-base">{{ description }}</p>

			<router-link :to="routeBackURL"
									 class="mt-auto text-xl underline text-blue-400 font-semibold hover:text-blue-600">{{ routeBack }}
			</router-link>
		</div>
	</div>
</template>