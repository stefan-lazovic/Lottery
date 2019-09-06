<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <lottery :key="componentKey" v-on:reset="forceRerender()"></lottery>
  </div>
</template>

<script>
import Lottery from './components/Lottery.vue'

export default {
  name: 'app',
  components: {
    Lottery
  },
  data() {
    return {
      componentKey: 0
    }
  },
  methods: {
    // re-render the component with key-changing https://michaelnthiessen.com/force-re-render
    forceRerender() {
      this.componentKey += 1;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

@media only screen and (max-width: 494px) {
  #app {
    margin-top: 15px;
  }
}
</style>
