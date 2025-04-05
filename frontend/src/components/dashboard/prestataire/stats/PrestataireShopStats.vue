<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-6 h-full">
    <InfoCard classes="col-span-full md:col-span-6 lg:col-span-3">
      <h2 class="text-xl font-semibold text-gray-300">
        <strong class="text-white text-2xl">{{ $n(clients_count) }} </strong>
        {{ $t("dashboards.statistics.shop.clients") }}
        <br>
        <strong class="text-white text-2xl">{{ commands }}</strong>
        {{ $t("dashboards.statistics.shop.commands") }}
      </h2>
    </InfoCard>

    <InfoCard classes="col-span-full md:col-span-6 lg:col-span-3">
      <h2 class="font-extrabold text-white text-2xl">
        {{ Intl.NumberFormat("fr-FR").format(total_gains) }} €
      </h2>
      <p class="text-gray-400 text-sm font-medium">
        {{ $t("dashboards.statistics.shop.benef") }}
      </p>
    </InfoCard>

    <InfoCard classes="col-span-full lg:col-span-6 row-span-3">
      <apexchart
          type="treemap"
          :options="articles_chart.chartOptions"
          :series="articles_chart.series"
          width="100%"
          height="400px"
      ></apexchart>
    </InfoCard>

    <InfoCard classes="col-span-full lg:col-span-6 row-span-2">
      <apexchart
          type="pie"
          :options="categories_chart.chartOptions"
          :series="categories_chart.series"
          width="100%"
          height="400px"
      ></apexchart>
    </InfoCard>


    <InfoCard classes="col-span-full lg:col-span-full row-span-3">
      <apexchart
          type="area"
          :options="gains_chart_infos.chartOptions"
          height="250px"
          width="270%"
          :series="gains_chart_infos.series"
      ></apexchart>
    </InfoCard>

  </div>
</template>

<script>
import InfoCard from "@/components/dashboard/stats/InfoCard.vue";
import BoutiqueService from "@/services/boutique.service";
import i from "@/i18n";
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
        series: [
          {
            name: "Gains",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {enabled: false},
          markers: {size: 0},
          stroke: {curve: "smooth"},
          title: {
            text: i.t("dashboards.statistics.shop.turnover"),
            align: "left",
            style: {
              color: "#fff", //Set title color
            },
          },
          grid: {
            row: {
              colors: ["transparent"],
              opacity: 0.5,
            },
            borderColor: "#4a5568", //Grid lines color
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            labels: {
              style: {
                colors: "#e2e8f0", // X-axis label color
              },
            },
          },
          yaxis: {
            title: {
              text: i.t("dashboards.statistics.shop.gains_graph"),
              style: {
                color: "#fff", // Y-axis title color
              },
            },
            labels: {
              formatter: function (value) {
                return value.toLocaleString("fr-FR") + "€";
              },
              style: {
                colors: "#e2e8f0", // Y-axis label color
              },
            },
          },
          colors: ["#81e6d8"], //Line color
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              colorStops: [
                [
                  {
                    offset: 0,
                    color: "#81e6d8",
                    opacity: 1,
                  },
                  {
                    offset: 100,
                    color: "#f56565",
                    opacity: 1,
                  },
                ],
              ],
            },
          },
        },
      },
      categories_chart: {
        series: [],
        chartOptions: {
          chart: {
            toolbar: {
              show: true,
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false
              }
            },
            id: "shop_categories",
            width: "100%",
            type: "pie",
          },
          plotOptions: {
            pie: {
              offsetX: 20,
              offsetY: 10
            }
          },
          legend: {
            show: true,
            position: "right",
            labels: {
              colors: "#e2e8f0", //Legend label color
            },
          },
          title: {
            text: i.t("dashboards.statistics.shop.sells_by_ctg"),
            style: {
              color: "#fff", //Title color
            },
          },
          dataLabels: {
            enabled: true,
          },
          labels: [],
          stroke: {
            colors: "#2d3748", // Pie slice border color
          },
        },
      },
      articles_chart: {
        series: [],
        chartOptions: {
          legend: {
            show: false,
          },
          chart: {
            id: "shop_articles",
            width: "100%",
            type: "treemap",
          },
          title: {
            text: i.t("dashboards.statistics.shop.sells_by_article"),
            style: {
              color: "#fff", //Title color
            },
          },
          colors: ["#4a5568"],
        },
      },
    };
  },
  props: {
    prestataire_id: String,
  },
  computed: {
    ...mapState("login", ["loggedInUser"]),
  },
  async beforeMount() {
    const shop = await PrestataireService.getPrestataire(this.prestataire_id);
    if (shop.error) throw new Error("cannot get shop");

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

        ApexCharts.exec("shop_categories", "updateOptions", {
          labels: res.data.labels,
          series: res.data.series,
        });
      }
    },
    async getBoutiqueArticleSellsStats(shop_id) {
      let res = await BoutiqueService.getBoutiqueArticleSellsStats(shop_id);

      if (!res.error) {
        // Correctly format the data for the treemap
        this.articles_chart.series = [{data: res.data}];

        ApexCharts.exec("shop_articles", "updateSeries", [{data: res.data}]);
      }
    },
  },
};
</script>

<style>
.apexcharts-menu {
  background: #2d3748 !important;
  border: 1px solid #4a5568 !important;
}

.apexcharts-menu-item {
  color: #e2e8f0 !important;
}

.apexcharts-menu-item:hover {
  background: #4a5568 !important;
}
</style>