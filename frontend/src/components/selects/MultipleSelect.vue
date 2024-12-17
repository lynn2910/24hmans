<template>
	<div class="relative w-full select-none" v-click-outside="closeItemsTab">
		<div
				class="w-full h-10 border-2 border-blue-400 border-opacity-50 rounded text-sm flex flex-row align-middle justify-start bg-dark"
				:class="showItems ? 'border-opacity-100' : ''"
				@click="showItems = true">
			<!-- Placeholder -->
			<p v-if="selected.length === 0" class="text-gray-500 m-auto ml-2">{{ placeholder }}</p>
			<p v-for="(item, index) in selected" :key="index"
				 class="my-auto mr-1 ml-2 py-1 px-2 bg-blue-600 bg-opacity-25 rounded">
				{{
					item
				}}</p>
		</div>
		<div v-if="showItems"
				 class="border-2 border-blue-400 border-opacity-50 rounded min-h-10 absolute top-12 w-full p-1 bg-dark z-50"
				 :class="showItems ? 'border-opacity-100' : ''">
			<div v-for="(item, index) in items" :key="index"
					 class="flex flew-row align-middle py-2 px-3 hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer rounded"
					 @click="itemClicked(item)">
				<p class="mr-auto">{{ item }}</p>
				<svg
						v-if="selected.includes(item)"
						class="shrink-0 size-4 text-blue-600 my-auto ml-2" xmlns="http://www.w3.org/2000/svg" width="16"
						height="16"
						fill="currentColor" viewBox="0 0 16 16">
					<path
							d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MultipleSelect",
	data() {
		return {
			selected: [],
			showItems: false
		}
	},
	methods: {
		removeItem(item) {
			console.log(item)
			let index = this.selected.indexOf(item);
			console.log(index)
			if (index > -1) {
				this.selected.splice(index, 1);

				this.$emit("selectionChange", this.selected)
			}
		},
		itemClicked(item) {
			if (this.selected.includes(item)) {
				// remove
				this.removeItem(item);
			} else {
				this.selected.push(item)
			}

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
