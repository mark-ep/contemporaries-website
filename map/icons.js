import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// const icon = require('leaflet/dist/images/marker-icon.png');
// const iconShadow = require('leaflet/dist/images/marker-shadow.png')

// load the default image for map markers
export const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [35, 46],
    iconAnchor: [17, 46],
});

// load alternate marker icon for highlighting the query subject
export const SubjectIcon = L.icon({
    iconUrl: '/marker_red.png',
    shadowUrl: iconShadow.src,
    iconSize: [35, 46],
    iconAnchor: [17, 46],
});

// load the marker image for showing the connections
export const LinkIcon = L.icon({
    iconUrl: '/link_colour_icon_inverted_thick.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
})