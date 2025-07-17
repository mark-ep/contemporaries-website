import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { spreadCollisions } from "../helpers/group_collisions";

// exprot const MapContext = createContext()
export const MarkersContext = createContext([]);
export const BoundsContext = createContext();

export const getBounds = (people) => {
  /*
   * returns the corners of the bounding box
   * that contains the provided list of people
   */
  if (!people || people.length === 0)
    return null;

  const lats = people.map(person => person.location[1])
  const lons = people.map(person => person.location[0])
  const maxLat = Math.max(...lats);
  const minLat = Math.min(...lats);
  const maxLon = Math.max(...lons);
  const minLon = Math.min(...lons);

  return [
    [minLat, minLon],
    [maxLat, maxLon]
  ]
}

export const markersReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return !!action.item.location ? [...state, action.item] : state;
    case "REMOVE":
      return state.filter(item => item !== action.item);
    case "SET":
      return action.items ? action.items.filter(item => !!item.location) : [];
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export const MapContext = ({ children, data }) => {
  const [markerItems, markerDispatch] = useReducer(markersReducer);

  useEffect(
    () => markerDispatch({ type: "SET", items: data }), [data]
  )

  const onAddMarker = useMemo(
    () => item => markerDispatch({ type: "ADD", item }), []
  );
  const onRemoveMarker = useMemo(
    () => item => markerDispatch({ type: "REMOVE", item }), []
  );
  const markers = useMemo(
    () => spreadCollisions(markerItems), [markerItems]
  )
  const bounds = useMemo(
    () => markers ? getBounds(markers) : null,
    [markers]
  )

  return (
    <MarkersContext.Provider value={{ markers, onAddMarker, onRemoveMarker }}>
      <BoundsContext.Provider value={bounds}>
        {children}
      </BoundsContext.Provider>
    </MarkersContext.Provider>
  )

}
export const useMarkers = () => useContext(MarkersContext);
export const useBounds = () => useContext(BoundsContext)

export const useToggleMarker = (marker) => {
  const { markers, onAddMarker, onRemoveMarker } = useMarkers();

  const isMapped = markers && markers.some(x => x === marker);

  const onToggleMarker = useCallback(
    () => {
      if (isMapped) {
        onRemoveMarker(marker);
      } else {
        onAddMarker(marker);
      }
    }
  );

  return [isMapped, onToggleMarker]
}
