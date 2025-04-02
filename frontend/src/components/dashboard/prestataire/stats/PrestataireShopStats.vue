<template>
	<div class="grid grid-cols-6 grid-rows-5 gap-2 mr-2 h-full">
		<!-- Pie (ventes par catégories) -->
		<!-- TreeMap (ventes par catégorie/articles) -->

		<!-- Top -->
		<InfoCard classes="col-span-1">
			<h2>
				<strong>{{ $n(clients_count) }}</strong>
				{{ $t('dashboards.statistics.shop.clients') }}
			</h2>
		</InfoCard>

		<InfoCard classes="col-span-1">
			<h2 class="text-xl font-extrabold">{{ Intl.NumberFormat('fr-FR').format(total_gains) }} €</h2>
			<p class="text-gray-300 text-sm font-medium">{{ $t('dashboards.statistics.shop.benef') }}</p>
		</InfoCard>

		<InfoCard classes="col-span-4 row-span-2">
			<apexchart type="area" :options="gains_chart_infos.chartOptions" height="200px" width="600px"
								 :series="gains_chart_infos.series"></apexchart>
		</InfoCard>

		<InfoCard classes="col-span-1">
			<h2><strong>{{ commands }}</strong> {{ $t('dashboards.statistics.shop.commands') }}</h2>
		</InfoCard>

		<div></div>

		<!-- TreeMap + Pie -->
		<InfoCard classes="col-span-3 row-span-3">
			<apexchart type="pie" :options="categories_chart.chartOptions" :series="categories_chart.series"
								 width="400px"></apexchart>
		</InfoCard>

		<InfoCard classes="col-span-3 row-span-3">
			<apexchart type="treemap" :options="articles_chart.chartOptions" :series="articles_chart.series"
								 width="400px"></apexchart>
		</InfoCard>

	</div>
</template>

<script>
import InfoCard from "@/components/dashboard/stats/InfoCard.vue";
import BoutiqueService from "@/services/boutique.service";
import i from '@/i18n'

import {mapState} from "vuex";
import ApexCharts from "apexcharts";
import PrestataireService from "@/services/prestataire.service";

export default {
	name: "PrestataireShopStats",
	components: {InfoCard},
	data() {
		return {
			clients_count: 3,
			commands: 14,
			total_gains: 17864.96,
			gains_chart_infos: {
				series: [{
					name: 'Gains',
					data: []
				}],
				chartOptions: {
					chart: {
						type: 'line',
						height: 350,
						zoom: {
							enabled: false,
						}
					},
					dataLabels: {enabled: false},
					markers: {size: 0,},
					stroke: {curve: 'smooth'},
					title: {
						text: i.t('dashboards.statistics.shop.turnover'),
						align: 'left'
					},
					grid: {
						row: {
							colors: ['transparent'],
							opacity: 0.5
						},
					},
					xaxis: {
						categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
					},
					yaxis: {
						title: {
							text: i.t('dashboards.statistics.shop.gains_graph')
						},
						labels: {
							formatter: function (value) {
								return value.toLocaleString('fr-FR') + "€";
							}
						}
					}
				},
			},
			categories_chart: {
				series: [],
				chartOptions: {
					chart: {
						id: "shop_categories",
						width: 380,
						type: 'pie',
					},
					legend: {
						show: true,
						position: 'right',
					},
					title: {
						text: i.t('dashboards.statistics.shop.sells_by_ctg'),
					},
					dataLabels: {
						enabled: true,
					},
				},
			},
			articles_chart: {
				series: [],
				chartOptions: {
					legend: {
						show: false
					},
					chart: {
						id: "shop_articles",
						width: 380,
						type: 'treemap'
					},
					title: {
						text: i.t('dashboards.statistics.shop.sells_by_article')
					}
				},
			},
		};
	},
	props: {
		prestataire_id: String
	},
	computed: {
		...mapState('login', ['loggedInUser']),
	},
	async beforeMount() {
		const shop = await PrestataireService.getPrestataire(this.prestataire_id);
		if (shop.error) throw new Error("cannot get shop")

		await this.getBoutiqueCategoriesSellsStats(shop.data.shop_id);
		await this.getBoutiqueStats(shop.data.shop_id);
		await this.getBoutiqueChiffreAffaireSerie(shop.data.shop_id);
		await this.getBoutiqueArticleSellsStats(shop.data.shop_id);
	},
	methods: {
		async getBoutiqueChiffreAffaireSerie(shop_id) {
			let res = await BoutiqueService.getBoutiqueChiffreAffaireSerie(shop_id);

			if (!res.error) {
				this.gains_chart_infos.series[0].data = res.data.serie;
			} else {
				console.error(res.data);
			}
		},
		async getBoutiqueStats(shop_id) {
			let res = await BoutiqueService.getBoutiqueStats(shop_id);

			if (!res.error) {
				this.clients_count = res.data.clients;
				this.commands = res.data.commands;
				this.total_gains = res.data.total_gains;
			} else {
				console.error(res.data);
			}
		},
		async getBoutiqueCategoriesSellsStats(shop_id) {
			let res = await BoutiqueService.getBoutiqueCategoriesSellsStats(shop_id);

			if (!res.error) {
				this.categories_chart.series = res.data.series;
				this.categories_chart.chartOptions.labels = res.data.labels;

				ApexCharts.exec('shop_categories', 'updateOptions', {
					labels: res.data.labels,
					series: res.data.series
				})
			}
		},
		async getBoutiqueArticleSellsStats(shop_id) {
			let res = await BoutiqueService.getBoutiqueArticleSellsStats(shop_id);

			if (!res.error) {
				// Correctly format the data for the treemap
				this.articles_chart.series = [{data: res.data}];

				ApexCharts.exec('shop_articles', 'updateSeries', [{data: res.data}]);
			}
		}
	}
}
</script>