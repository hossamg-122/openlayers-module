<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar.vue";

export default Vue.extend({
  components: { AppBar },
  name: "App",

  data: () => ({
    //
  }),
});
</script>
