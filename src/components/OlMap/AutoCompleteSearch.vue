<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { eventBus } from "@/mixins";
export default {
  components: { VueGoogleAutocomplete },
  data: () => ({
    address: "",
  }),
  mounted() {
    this.$refs.address.focus();
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      eventBus.$emit("placeSelected", [
        addressData.longitude,
        addressData.latitude,
      ]);

      this.address = addressData;
    },
  },
};
</script>
<template>
  <vue-google-autocomplete
    ref="address"
    id="map"
    classname="form-control"
    placeholder="Location..."
    v-on:placechanged="getAddressData"
  >
  </vue-google-autocomplete>
</template>

<style lang="scss" scoped>
.form-control {
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;

  box-shadow: 0px 5px 8px rgba(154, 165, 176, 0.4);

  &:focus-visible {
    border: 0.05rem solid var(--v-secondary-base);
  }
  &:active {
    border: none !important;
  }
}
</style>
