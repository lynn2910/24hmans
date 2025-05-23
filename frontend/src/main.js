import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from "vue-apexcharts";
import './index.css'
import VueI18n from "@/libs/vue-i18n"
import i18n from "@/i18n";

Vue.config.productionTip = false

Vue.directive('click-outside', {
    bind: function (el, binding, node) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                node.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueI18n)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
