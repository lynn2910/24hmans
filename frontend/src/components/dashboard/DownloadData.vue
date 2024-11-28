<template>
	<div class="fill-white border border-gray-400 rounded flex flex-row content-center items-center justify-center">
		<div @click="showImportPopup = true"
				 class="cursor-pointer p-2 bg-white bg-opacity-5 hover:bg-opacity-10 border-r border-r-gray-400 border-opacity-25">
			<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
				<path
						d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path>
				<path
						d="M11.78 4.72a.749.749 0 1 1-1.06 1.06L8.75 3.811V9.5a.75.75 0 0 1-1.5 0V3.811L5.28 5.78a.749.749 0 1 1-1.06-1.06l3.25-3.25a.749.749 0 0 1 1.06 0l3.25 3.25Z"></path>
			</svg>
		</div>
		<div
				@click="$emit('copy')"
				class="cursor-pointer p-2 bg-white bg-opacity-5 hover:bg-opacity-10 border-r border-r-gray-400 border-opacity-25">
			<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
				<path
						d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
				<path
						d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
			</svg>
		</div>
		<div
				@click="$emit('download')"
				class="cursor-pointer p-2 bg-white bg-opacity-5 hover:bg-opacity-10 border-r border-r-gray-400 border-opacity-25">
			<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
				<path
						d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path>
				<path
						d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path>
			</svg>
		</div>

		<Popup title="Importation des données" v-if="showImportPopup" @close="closeImportPopup">
			<div
					@dragover.prevent="onDragOver"
					@dragleave.prevent="onDragLeave"
					@drop.prevent="onDrop"
					:class="{'border-blue-500': isDragging}"
					class="border-2 border-dashed p-4 text-center rounded border-gray-300 hover:border-white"
			>
				<input
						type="file"
						ref="fileInput"
						@change="handleFileUpload"
						accept=".json"
						class="hidden"
				>
				<button @click="$refs.fileInput.click()" class="font-bold underline">
					Choisir un fichier
				</button>
				<p>ou glissez-déposez un fichier JSON ici</p>
			</div>
		</Popup>
	</div>
</template>

<script>
import Popup from "@/components/dashboard/Popup.vue";

export default {
	name: "DownloadData",
	components: {Popup},
	data() {
		return {
			isDragging: false,
			showImportPopup: false
		}
	},
	methods: {
		closeImportPopup() {
			this.showImportPopup = false
		},
		onDragOver() {
			this.isDragging = true
		},
		onDragLeave() {
			this.isDragging = false
		},
		onDrop(e) {
			this.isDragging = false
			const files = e.dataTransfer.files
			this.processFile(files[0])
		},
		handleFileUpload(e) {
			const file = e.target.files[0]
			this.processFile(file)
		},
		processFile(file) {
			if (file.type === 'application/json') {
				const reader = new FileReader()
				reader.onload = (e) => {
					try {
						const jsonData = JSON.parse(e.target.result)

						this.$emit('import', {error: 0, data: jsonData})
					} catch (error) {
						this.$emit('import', {error: 1, data: error})
					}
				}
				reader.readAsText(file);

				this.showImportPopup = false;
			} else {
				alert('Veuillez sélectionner un fichier JSON')
			}
		}
	}
}
</script>