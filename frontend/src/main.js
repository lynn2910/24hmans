import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
