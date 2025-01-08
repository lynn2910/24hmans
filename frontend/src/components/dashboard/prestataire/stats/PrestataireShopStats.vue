<template>
	<div class="grid grid-cols-7 grid-rows-4 gap-2 mr-2">
		<!-- Pie (ventes par catégories) -->
		<!-- TreeMap (ventes par catégorie/articles) -->

		<!-- Top -->
		<InfoCard classes="col-span-1">
			<h2><strong>{{ clients_count }}</strong> clients</h2>
		</InfoCard>

		<InfoCard classes="col-span-2">
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

		<!-- TreeMap + Pie -->

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
			}
		})
	}
}
</script>