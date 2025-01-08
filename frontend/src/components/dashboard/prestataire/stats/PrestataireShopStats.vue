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

export default {
	name: "PrestataireShopStats",
	components: {InfoCard},
	data() {
		return ({
			clients_count: 3,
			commands: 14,
			total_gains: 17864.96,
			gains_chart_infos: {
				series: [{
					name: 'Gains',
					data: [10, 20, 36, 79, 84, 24, 56]
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
						}
					}
				},
			},
			categories_chart: {
				series: [44, 87],
				chartOptions: {
					chart: {
						width: 380,
						type: 'pie',
					},
					legend: {
						show: false
					},
					labels: ['Écussons', 'Porte-clé'],
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
				series: [
					{
						data: [
							{
								x: 'Porte-clé frein',
								y: 218
							},
							{
								x: 'Écusson porsche',
								y: 149
							},
							{
								x: 'Porte-clé porsche',
								y: 184
							},
							{
								x: 'Porte-clé 911',
								y: 58
							},
						]
					}
				],
				chartOptions: {
					legend: {
						show: false
					},
					chart: {
						width: 380,
						type: 'treemap'
					},
					title: {
						text: 'Répartition des ventes par article'
					}
				},

			}
		})
	}
}
</script>