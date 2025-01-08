<template>
	<div :class="classes"
			 class="w-full bg-blue-400 bg-opacity-10 border-2 border-blue-400 rounded p-2 flex items-center justify-center">
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "InfoCard",
	props: {
		classes: {
			type: String,
			required: false,
			default: () => ''
		}
	}
}
</script>