<script>
import View from "ol/View";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";

import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { transform, toLonLat, fromLonLat } from "ol/proj";
import { Modify } from "ol/interaction";
import GeoJSON from "ol/format/GeoJSON";
import WebGLPointsLayer from "ol/layer/WebGLPoints";
import Overlay from "ol/Overlay";
import { markerIcon, realEstateIcon } from "./style";
import "ol/ol.css";
import { eventBus } from "@/mixins";

export default {
  name: "OlMap",

  data() {
    return {
      olMap: null,
      iconFeature: null,
      coordinates: [45.0792, 23.8859], // sa city center
      marketPosition: [45.0792, 23.8859], // sa city center
      overlay: null,
      zoom: 4.5,

      location: "",
      warehouse: "",

      address: "",
    };
  },
  created() {
    eventBus.$on("placeSelected", this.getCoordinates);
  },
  mounted() {
    const warehousesData = new VectorSource({
      url: "https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson",
      format: new GeoJSON(),
      wrapX: true,
    });

    // location marker config
    this.iconFeature = new Feature({
      geometry: new Point(
        transform(this.marketPosition, "EPSG:4326", "EPSG:3857")
      ),
    });

    this.iconFeature.setStyle(markerIcon);
    const markerData = new VectorSource({
      features: [this.iconFeature],
    });
    const markerLayer = new VectorLayer({
      source: markerData,
    });

    const warehousesLayer = new WebGLPointsLayer({
      source: warehousesData,
      style: realEstateIcon,
    });

    // popup config
    const popup = this.$refs["popup"];
    const closer = this.$refs["popup-closer"];

    this.overlay = new Overlay({
      element: popup,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    // closer.onclick = function (e) {
    //   console.log("test", e.preventDefault());
    //   overlay.setPosition(undefined);
    //   closer.blur();
    //   return false;
    // };

    // this is where we create the OpenLayers map
    const baseLayer = new TileLayer({
      source: new OSM(),
    });
    const target = this.$refs["map-root"];
    this.olMap = new Map({
      // the map will be created using the 'map-root' ref
      target,
      layers: [baseLayer, markerLayer, warehousesLayer],
      overlays: [this.overlay],
      // the map view will initially show the whole world
      view: new View({
        zoom: this.zoom,
        center: transform(this.coordinates, "EPSG:4326", "EPSG:3857"),
        constrainResolution: true,
      }),
    });

    // this where we handle opening the popup modal
    this.olMap.getViewport().addEventListener("click", (e) => {
      this.olMap.forEachFeatureAtPixel(
        this.olMap.getEventPixel(e),
        (feature, layer) => {
          let { values_ } = { ...feature };

          if (!values_.geopoint) return;

          this.location = `${values_.geopoint[1]} , ${values_.geopoint[0]}`;
          this.warehouse = values_.accentcity;
          this.overlay.setPosition(
            fromLonLat([values_.geopoint[1], values_.geopoint[0]])
          );
        }
      );
    });

    // animate the map
    const animate = () => {
      this.olMap.render();
      window.requestAnimationFrame(animate);
    };
    animate();
    //points layer
    const modify = new Modify({
      hitDetection: markerLayer,
      source: markerData,
    });

    modify.on(["modifystart", "modifyend"], (evt) => {
      this.changeMarkerLocation();

      target.style.cursor = evt.type === "modifystart" ? "grabbing" : "pointer";
    });

    const overlaySource = modify.getOverlay().getSource();
    overlaySource.on(["addfeature", "removefeature"], function (evt) {
      target.style.cursor = evt.type === "addfeature" ? "pointer" : "";
    });

    this.olMap.addInteraction(modify);
  },

  methods: {
    getCoordinates(coords) {
      if (this.olMap) {
        this.olMap.getView().setZoom(12);
        this.olMap
          .getView()
          .setCenter(transform(coords, "EPSG:4326", "EPSG:3857"));
        this.address = toLonLat(coords, "EPSG:4326", "EPSG:3857");
        this.iconFeature.setGeometry(
          new Point(transform(coords, "EPSG:4326", "EPSG:3857"))
        );
      }
    },
    changeMarkerLocation() {
      this.address = toLonLat(this.iconFeature.getGeometry().flatCoordinates);
    },
    closePopup() {
      this.overlay.setPosition(undefined);
    },
  },
};
</script>
<template>
  <div>
    <div class="py-5 px-2 mb-3 bg-gray-8 rounded-lg">
      <h2>Picked Location: {{ address }}</h2>
    </div>
    <div ref="map-root" style="width: 100%; height: 500px"></div>
    <div ref="popup" class="ol-popup">
      <v-icon
        style="position: absolute; top: 5px; right: 5px; z-index: 99999"
        ref="popup-closer"
        @click.prevent="closePopup"
        >mdi-close-box-outline</v-icon
      >

      <div id="popup-content">
        <div class="flex p-5 font-standard w-full">
          <div class="align-self-start">
            <div class="py-10 px-5 rounded-3xl ws-shadow">
              <v-img :src="require('@/assets/images/realEstate.png')" />
            </div>
          </div>
          <div class="pl-5 text-lg">
            <div class="flex">
              <v-icon>$vuetify.icons.pin</v-icon>
              <h2 class="text-capitalize text-gray">
                <span class="mx-2">city:</span>
                <span class="text-primary">{{ warehouse }}</span>
              </h2>
            </div>
            <div class="flex my-5">
              <v-icon class="align-self-start">$vuetify.icons.location</v-icon>
              <div class="flex text-capitalize text-gray">
                <div class="mx-2"><h2>Location:</h2></div>
                <div class="text-primary">
                  <h2>
                    {{ location }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ol-viewport,
.ol-unselectable {
  border-radius: 15px !important;
}
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  width: 650px;
  overflow-wrap: break-word;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 4px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
  color: #9aa5b0;
  border: 1px solid #9aa5b0;
  padding-inline: 2px;
  border-radius: 5px;
}
</style>

<style lang="scss" scoped>
.resource-wrapper {
  margin-top: 15px;
}
.resource-wrapper > span {
  color: #57697b;
  line-height: 22px;
}
.resources-list {
  margin-top: 5px;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  li {
    display: flex;
    align-items: center;
    padding: 5px 35px 5px 10px;
    position: relative;

    box-shadow: 0px 2px 4px 1px rgb(154 165 176 / 19%);
    border-radius: 16px;
    margin-left: 7px;
    margin-top: 7px;
    .resource-title {
      font-size: 1em;
      color: #48beea;
      text-align: center;
      text-transform: capitalize;
    }
    .delete-controls {
      position: absolute;
      right: 8px;
      top: 8px;
      text-align: center;
      color: #48beea;
      font-size: 16px;
      transition: 0.3s ease all;
    }
  }
}
</style>
