<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: "Real Estate Search",
    },
    subtitle: {
      type: String,
      default: "Welcome to GeoTech Real Estate Search",
    },
    instructions: {
      type: Array,
      default: () => [
        "Search about your needs and select your desired location",
        "Start exploring the list",
      ],
    },
  },
  data() {
    return {
      demo: false,
    };
  },
};
</script>
<template>
  <div class="flex justify-between p-4 bg-gray-8 rounded-lg">
    <div class="space-y-3">
      <h1 class="text-primary">{{ title }}</h1>
      <h2 class="text-info">{{ subtitle }}</h2>
      <ul>
        <li v-for="(info, i) in instructions" :key="i">
          <span class="text-secondary">{{ i + 1 }}&nbsp;-&nbsp;</span>{{ info }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>
