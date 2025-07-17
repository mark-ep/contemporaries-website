import { useEffect } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import ZoomControlWithReset from "../components/ZoomControl";
import { useBounds, useMarkers } from "../contexts/MapContext";
import { useSetZoomTo } from "../helpers/zoomTo";
import Connection from "./Connection";
import PersonMarker from "./PersonMarker";



export const PeopleMarkers = () => {
  /*
   * generates the markers and connection lines for the current set of people
   */
  // // call the useMap hook - we'll use this to set the view options to zoom to the
  // // markers that we render
  // const bounds = null;
  // const markers = [];

  // const map = useMap();
  // // get the markers from the MapContext provider
  // // const { markers, onRemoveMarker } = useMarkers();
  const markers = useMarkers().markers || [];
  // // get the map bounds from the MapContext provider
  // const bounds = useBounds();

  // // create a callback that will change the zoom and position of the map to match
  // // the loaded people.


  // // const setZoom = useMemo(
  // //   () => loc => map.setView(loc, 10), [map]
  // // )
  // useSetZoomTo(
  //   () => loc => map.setView(loc, 8)
  // );

  // find in the list of people to marked the person who's the subject of
  // the user's query
  const locatedQuery = markers.find(p => p.subjectMarker);
  return (
    <FeatureGroup>
      {/* generate connections for all the people who have them */}
      {locatedQuery && markers
        .filter(person => !person.subjectMarker && !!person.has_connections)
        .map(person =>
          <Connection
            query={locatedQuery}
            person={person}
            key={`${person.name}-connection`}
          />
        )}
      {/* generate markers for all the people in the map */}
      {markers.map(person =>
        <PersonMarker person={person} key={person.name} />
      )}
    </FeatureGroup>
  );
};

export default PeopleMarkers