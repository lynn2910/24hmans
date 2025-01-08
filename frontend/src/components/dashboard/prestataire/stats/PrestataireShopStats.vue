<template>
	<div class="grid grid-cols-6 grid-rows-5 gap-2 mr-2 h-full">
		<!-- Pie (ventes par catégories) -->
		<!-- TreeMap (ventes par catégorie/articles) -->

		<!-- Top -->
		<InfoCard classes="col-span-1">
			<h2><strong>{{ clients_count }}</strong> clients</h2>
		</InfoCard>

		<InfoCard classes="col-span-1">
			<h2 class="text-xl font-extrabold">{{ Intl.NumberFormat('fr-FR').format(total_gains) }} €</h2>
			<p class="text-gray-300 text-sm font-medium">de bénéfices</p>
		</InfoCard>

		<InfoCard classes="col-span-4 row-span-2">
			<apexchart type="area" :options="gains_chart_infos.chartOptions" height="200px" width="600px"
								 :series="gains_chart_infos.series"></apexchart>
		</InfoCard>

		<InfoCard classes="col-span-1">
			<h2><strong>{{ commands }}</strong> commandes</h2>
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
import {mapState} from "vuex";
import ApexCharts from "apexcharts";

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
						text: 'Chiffre d\'affaire',
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
							text: "Argent gagnée en €"
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
						text: 'Répartition des ventes par catégorie de produit',
					},
					dataLabels: {
						enabled: true,
						// formatter: function (val, {seriesIndex, w}) {
						// 	return Math.floor(val) + "% - " + w.config.series[seriesIndex] + " achats";
						// }
					},
				},
			},
			articles_chart: {
				series: [{data: []}],
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
						text: 'Répartition des ventes par article'
					}
				},
			},
		};
	},
	computed: {
		...mapState('login', ['loggedInUser']),
	},
	async beforeMount() {
		await this.getBoutiqueCategoriesSellsStats();
		await this.getBoutiqueStats();
		await this.getBoutiqueChiffreAffaireSerie();
		await this.getBoutiqueArticleSellsStats();
	},
	methods: {
		async getBoutiqueChiffreAffaireSerie() {
			let res = await BoutiqueService.getBoutiqueChiffreAffaireSerie(this.loggedInUser?.id);

			if (!res.error) {
				this.gains_chart_infos.series[0].data = res.data.serie;
			} else {
				console.error(res.data);
			}
		},
		async getBoutiqueStats() {
			let res = await BoutiqueService.getBoutiqueStats(this.loggedInUser?.id);

			if (!res.error) {
				this.clients_count = res.data.clients;
				this.commands = res.data.commands;
				this.total_gains = res.data.total_gains;
			} else {
				console.error(res.data);
			}
		},
		async getBoutiqueCategoriesSellsStats() {
			let res = await BoutiqueService.getBoutiqueCategoriesSellsStats(this.loggedInUser?.id);

			if (!res.error) {
				this.categories_chart.series = res.data.series;
				this.categories_chart.chartOptions.labels = res.data.labels;

				console.log(JSON.stringify(res.data));

				ApexCharts.exec('shop_categories', 'updateOptions', {
					labels: res.data.labels,
					series: res.data.series
				})
			}
		},
		async getBoutiqueArticleSellsStats() {
			let res = await BoutiqueService.getBoutiqueArticleSellsStats(this.loggedInUser?.id);

			if (!res.error) {
				this.articles_chart.series = res.data;

				ApexCharts.exec('shop_articles', 'updateOptions', {
					series: res.data
				})
			}
		}
	}
}
</script>