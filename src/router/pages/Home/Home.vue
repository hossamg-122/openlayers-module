<script lang="ts">
import Vue from "vue";
import * as metaData from "@/plugins/metaData";
import InfoCard from "@/components/InfoCard.vue";
import OlMap from "@/components/OlMap/OlMap.vue";
import AutoCompleteSearch from "@/components/OlMap/AutoCompleteSearch.vue";
export default Vue.extend({
  components: { InfoCard, OlMap, AutoCompleteSearch },
  name: "Home",
  metaInfo: {
    title: metaData.home.title,
    meta: [
      {
        name: "description",
        content: metaData.home.description,
      },
    ],
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<template>
  <layout>
    <template>
      <info-card />

      <div class="grid grid-cols-12 gap-4 my-4">
        <div class="col-span-11 ws-input"><auto-complete-search /></div>
        <div class="col-span-1">
          <v-btn large color="primary">Search</v-btn>
        </div>
      </div>
      <div class="mt-5 rounded-lg mb-8"><ol-map /></div>
    </template>
  </layout>
</template>
