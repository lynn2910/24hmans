<template>
	<div class="flex flex-row items-center content-center justify-between">
		<div class="w-5/6">
			<input
					class="outline-none border border-gray-700 rounded bg-gray-800 py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
					v-model="password"
					@keyup="keyUp"
					:type="showPassword ? 'text' : 'password'"
					:placeholder="$t('login.password.placeholder')" minlength="1">

			<!-- Security level -->
			<div
					class="flex flex-row w-full items-center content-center justify-between mt-2">
				<div v-for="scoreRequired in [0,1,2,3,4]" :key="scoreRequired"
						 class="rounded w-1/6 m-auto h-1"
						 :class="passwordLevel > scoreRequired ? passwordScoreColor(passwordLevel) : 'bg-gray-400'"></div>

			</div>
		</div>

		<div
				class="bg-dark w-10 h-10 flex flex-col rounded ml-5 border border-gray-400 cursor-pointer hover:border-blue-500"
				@click="showPassword = !showPassword">
			<svg v-if="showPassword" class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg"
					 width="24"
					 height="24"
					 viewBox="0 0 24 24">
				<path
						d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
			</svg>
			<svg v-else class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
					 viewBox="0 0 24 24">
				<path
						d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
			</svg>
		</div>
	</div>
</template>

<script>
import {evaluatePasswordSecurity, passwordScoreColor} from "@/utils";

export default {
	name: "PasswordChanger",
	methods: {
		passwordScoreColor,
		keyUp() {
			this.passwordLevel = evaluatePasswordSecurity(this.password);
			this.$emit("levelUpdate", this.passwordLevel);
			this.$emit("passwordChange", this.password);
		}
	},
	data() {
		return ({
			password: "",
			showPassword: false,
			passwordLevel: -1
		})
	}
}
</script>