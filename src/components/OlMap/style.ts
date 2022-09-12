import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
export const markerIcon = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: "fraction",
    anchorYUnits: "pixels",
    src: require("@/assets/images/marker.png"),
  }),
});

export const realEstateIcon = {
  symbol: {
    symbolType: "image",
    src: require("@/assets/images/realEstate-mark.png"),
    size: [25, 35],
    color: "lightyellow",
    rotateWithView: false,
    offset: [0, 9],
  },
};
