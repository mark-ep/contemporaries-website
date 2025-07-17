import { Box } from "@chakra-ui/react";
// import L from "leaflet";
// import "leaflet-providers/leaflet-providers";
import 'leaflet/dist/leaflet.css';
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ZoomControlWithReset from "./components/ZoomControl";
// import { MapContext } from "./contexts/MapContext";
import { DefaultIcon } from "./map/icons";
import PeopleMarkers from "./map/PeopleMarkers";



export const Map = ({ ...props }) => {
  /*
   * the main Map element
   */
  // get the list of people and add the query person to it
  // const allPeople = !!query ? [...people, { ...query, subjectMarker: true }] : people;

  useEffect(
    () => {
      // set the default marker image
      L.Marker.prototype.options.icon = DefaultIcon;
      // and popup offset
      L.Popup.prototype.options.offset = [0, -46];
    },
    []
  );

  // set attribution text for map imagery
  // const attrib = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';
  return (
    // <MapContext data={allPeople}>
    <Box w="full" h="full" {...props} as="main">
      <MapContainer
        id="map"
        zoomControl={false}
        center={[0, 0]}
        scrollWheelZoom={false}
        zoom={3}
        minZoom={1}
        maxZoom={13}
      >
        {/* <TileLayer
            attribution={attrib}
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          /> */}
        <TileLayer
          attribution={`&copy; <a href=" http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Leaflet ${L.version}`}
          accessToken="8f88ae1627744ffea386aa686f0376e4"
          url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=8f88ae1627744ffea386aa686f0376e4"
        />
        <PeopleMarkers />
        <div className="leaflet-top leaflet-left">
          <ZoomControlWithReset />
        </div>
      </MapContainer>

    </Box>
    // </MapContext>
  )
}

export default Map;
