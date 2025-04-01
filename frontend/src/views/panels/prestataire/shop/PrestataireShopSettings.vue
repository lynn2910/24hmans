<template>
	<div class="mr-10">
		<div
				class="bg-opacity-25 border-2  text-center p-5 rounded flex flex-col items-center justify-center"
				:class="shopEnabled ? 'bg-emerald-600 border-emerald-600' : 'bg-red-600 border-red-600'">
			<p>{{
					shopEnabled ?
							$t('dashboards.presta_admin.shop.global_settings.shop_online')
							: $t('dashboards.presta_admin.shop.global_settings.shop_offline')
				}}</p>

			<div>
				<router-link target="_blank" :to="{ name: 'shop_view', params: { prestataire_name: prestataire.referencer }}"
										 class="bg-dark p-2 rounded mt-5 flex flex-row content-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="fill-white" width="24" height="24" viewBox="0 0 24 24">
						<path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
					</svg>
					<p class="ml-1.5 mb-0.5">{{ $t('dashboards.presta_admin.shop.global_settings.watch_shop') }}</p>
				</router-link>
				<p class="italic w-56" v-if="shopEnabled">
					{{ $t('dashboards.presta_admin.shop.global_settings.visibility.everyone') }}
				</p>
				<p class="italic w-56" v-else>{{
						$t('dashboards.presta_admin.shop.global_settings.visibility.only_presta')
					}}
				</p>
			</div>
		</div>

		<h2 class="font-bold text-2xl my-5">{{ $t('global.settings') }}</h2>

		<div class="flex flex-col gap-5 justify-start">

			<div class="flex flex-row items-center gap-5">
				<Toggle :value="shopEnabled" @change="publishOrUnpublish"></Toggle>
				<p>{{ $t('dashboards.presta_admin.shop.global_settings.access.public') }}</p>
			</div>

			<div class="p-5 bg-gray-700 bg-opacity-25 border-2 border-gray-700 rounded flex flex-row items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-white mb-auto mr-2" width="30" height="30"
						 viewBox="0 0 24 24">
					<path
							d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
					<path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
				</svg>
				<p>{{ $t('dashboards.presta_admin.shop.global_settings.access.text') }}</p>
			</div>

		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Toggle from "@/components/selects/Toggle.vue";

export default {
	name: "PrestataireShopSettings",
	components: {Toggle},
	props: {
		prestataire: {
			type: Object,
			default: () => ({
				referencer: "",
			})
		},
	},
	computed: {
		...mapState('prestataire/boutique', ['shopEnabled', 'shopExists', 'shopId'])
	},
	methods: {
		...mapActions('prestataire/boutique', ['enableOrDisableShop']),
		publishOrUnpublish() {
			this.enableOrDisableShop({
				shop_id: this.shopId,
				value: !this.shopEnabled
			});
		}
	}
}
</script>