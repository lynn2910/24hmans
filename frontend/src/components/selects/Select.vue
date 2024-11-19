<template>
	<div class="relative w-full select-none" v-click-outside="closeItemsTab">
		<div
				class="w-full h-10 border-2 border-blue-400 border-opacity-50 rounded text-sm flex flex-row align-middle justify-start"
				:class="showItems ? 'border-opacity-100' : ''"
				@click="showItems = true">
			<!-- Placeholder -->
			<p v-if="selected.length === 0" class="text-gray-500 m-auto ml-2">{{ placeholder }}</p>
			<p class="my-auto mr-1 ml-2 py-1 px-2">{{ selected }}</p>
		</div>
		<div v-if="showItems"
				 class="border-2 border-blue-400 border-opacity-50 rounded min-h-10 absolute top-12 w-full p-1 bg-dark z-50"
				 :class="showItems ? 'border-opacity-100' : ''">
			<div v-for="(item, index) in items" :key="index"
					 class="flex flew-row align-middle py-2 px-3 hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer rounded"
					 :class="item === selected ? 'bg-gray-100 bg-opacity-5' : ''"
					 @click="itemClicked(item)">
				<p class="mr-auto">{{ item }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Select",
	data() {
		return {
			selected: this.items[0],
			showItems: false
		}
	},
	methods: {
		itemClicked(item) {
			this.selected = item;

			this.$emit("selectionChange", this.selected)
		},
		closeItemsTab() {
			this.showItems = false;
		}
	},
	props: {
		items: Array,
		placeholder: {
			type: String,
			default: "Aucun item sélectionné."
		}
	}
}
</script>
