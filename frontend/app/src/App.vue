<template>
  <div id="app">
    <router-view class="page-wrap"></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Layout/Footer.vue";

export default {
  components: {
    Footer
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-wrap {
  min-height: 100%;
  /* equal to footer height */
  margin-bottom: -60px; 
}
.page-wrap:after {
  content: "";
  display: block;
}
.footer, .page-wrap:after {
  height: 60px; 
}
</style>
