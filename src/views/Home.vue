<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
     API: {{ api }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { apis } from "@/api/v3";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      api: process.env.VUE_APP_BASE_URL
    };
  },
  mounted() {
    // js代码中使用环境变量
    console.log("BASE_URL: ", process.env.BASE_URL);
    console.log("VUE_APP_BASE_URL: ", process.env.VUE_APP_BASE_URL);
    console.log(this.$axios.get(apis.history))
  }
};
</script>
