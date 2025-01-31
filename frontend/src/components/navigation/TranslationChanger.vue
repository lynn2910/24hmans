<template>
	<div>
		<svg width="32" xmlns="http://www.w3.org/2000/svg" height="32" fill="none" class="cursor-pointer"
				 @click="showPopup = !showPopup">
			<g class="fills">
				<rect rx="0" ry="0" width="32" height="32"
							transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" class="frame-background"/>
			</g>
			<g style="fill: rgb(0, 0, 0);" class="frame-children">
				<path
						d="M12.400,4.400C12.400,3.737,11.863,3.200,11.200,3.200C10.537,3.200,10.000,3.737,10.000,4.400L10.000,6.413C8.074,6.456,6.152,6.604,4.242,6.858C3.585,6.945,3.123,7.549,3.210,8.206C3.298,8.863,3.901,9.324,4.558,9.237C7.661,8.825,10.795,8.703,13.920,8.872C13.258,11.109,12.345,13.264,11.200,15.296C10.602,14.235,10.066,13.140,9.597,12.016C9.331,11.423,8.640,11.149,8.040,11.400C7.440,11.650,7.148,12.333,7.382,12.939C8.056,14.551,8.854,16.108,9.770,17.595C8.059,20.095,5.996,22.333,3.645,24.242C3.297,24.507,3.121,24.940,3.186,25.373C3.250,25.806,3.545,26.169,3.955,26.321C4.365,26.473,4.826,26.390,5.157,26.104C7.440,24.251,9.472,22.108,11.200,19.730C11.352,19.941,11.507,20.149,11.664,20.355C12.066,20.883,12.820,20.984,13.347,20.582C13.875,20.180,13.976,19.427,13.574,18.899C13.248,18.474,12.934,18.038,12.630,17.595C14.267,14.940,15.523,12.068,16.363,9.064C16.859,9.114,17.352,9.173,17.842,9.237C18.499,9.324,19.102,8.863,19.190,8.206C19.277,7.549,18.815,6.945,18.158,6.858C16.249,6.604,14.326,6.455,12.400,6.413L12.400,4.400ZZ"
						style="fill: rgb(255, 255, 255);" class="fills"/>
				<path
						d="M20.800,12.800C21.255,12.800,21.670,13.057,21.874,13.464L28.674,27.064C28.869,27.448,28.844,27.907,28.607,28.268C28.370,28.628,27.959,28.833,27.528,28.806C27.098,28.779,26.716,28.523,26.526,28.136L25.259,25.600L16.342,25.600L15.074,28.136C14.884,28.523,14.502,28.779,14.072,28.806C13.641,28.833,13.230,28.628,12.993,28.268C12.756,27.907,12.731,27.448,12.926,27.064L19.726,13.464C19.930,13.057,20.345,12.800,20.800,12.800ZZM24.059,23.200L20.800,16.683L17.542,23.200L24.059,23.200ZZ"
						clip-rule="evenodd" fill-rule="evenodd" style="fill: rgb(255, 255, 255);" class="fills"/>
			</g>
		</svg>
		<div v-if="showPopup"
				 class="absolute z-20 bg-dark border border-gray-500 rounded flex flex-row -translate-x-2/3 mt-3">
			<p v-for="l in SUPPORTED_LOCALES" :key="l"
				 @click="changeLocale(l)"
				 class="uppercase py-2 px-3 first:rounded-l last:rounded-r cursor-pointer"
				 :class="l === locale ? 'bg-white bg-opacity-50 cursor-help' : 'hover:bg-gray-500'">
				{{ l }}
			</p>
		</div>
	</div>
</template>

<script>
import {SUPPORTED_LOCALES} from "@/i18n";
import i18nActions from '@/translation'
import i18n from "@/i18n";

export default {
	name: "TranslationChanger",
	data() {
		return {
			showPopup: false,
			SUPPORTED_LOCALES
		}
	},
	computed: {
		locale() {
			return i18n.locale;
		}
	},
	methods: {
		async changeLocale(newLocale) {
			if (!SUPPORTED_LOCALES.includes(newLocale)) {
				return alert("This language does not exist, how did you fired this function?");
			}

			await i18nActions.switchLanguage(newLocale);

			try {
				await this.$router.replace({params: {locale: newLocale}})
			} catch (e) {
				console.error(e)
				await this.$router.push("/")
			}
			this.showPopup = false;
		}
	}
}

// const {locale} = useI18n()
//
// async function changeLocale(newLocale) {
// 	if (!SUPPORTED_LOCALES.includes(newLocale)) {
// 		return alert("This language does not exist, how did you fired this function?");
// 	}
//
// 	await i18nActions.switchLanguage(newLocale);
//
// 	try {
// 		await router.replace({params: {locale: newLocale}})
// 	} catch (e) {
// 		console.error(e)
// 		await router.push("/")
// 	}
// 	showPopup.value = false;
// }
</script>