import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


////////////////////////////////////////////////////////////////////////////////
// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './assets/css/main.css'


////////////////////////////////////////////////////////////////////////////////
// SweetAlert2
import Swal from 'sweetalert2'
window.Swal = Swal;


////////////////////////////////////////////////////////////////////////////////
// Vue-progressbar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  thickness: '6px'
})


new Vue({
  render: h => h(App),
}).$mount('#app')
