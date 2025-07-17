import { Marker, Polyline, Popup } from "react-leaflet";
import { Heading } from "@chakra-ui/react";
import arc from "arc";
import { Subheading } from "../components/Subheading";
import { SummaryPart } from "../components/SummaryPart";
import { divideIntoSegments } from "../helpers/divideIntoSegments";
import { LinkIcon } from "./icons";



export const Connection = ({ query, person }) => {
  /*
   * generates a connection line between the query subject and another person
   */
  const [qlon, qlat] = query.location;
  const start = { x: qlon, y: qlat };
  const [plon, plat] = person.location;
  const end = { x: plon, y: plat };

  let points;
  let midpoint;
  if (Math.abs(qlon - plon) < 180) {
    let generator = new arc.GreatCircle(start, end);
    let line = generator.Arc(101, { offset: 10 });
    // swap lats and lons
    points = line.geometries[0].coords.map(([lat, lon]) => [lon, lat]);
    midpoint = points[50];
  }
  else {
    points = divideIntoSegments({ x: qlat, y: qlon }, { x: plat, y: plon }, 100);
    midpoint = points[50];
  }
  return (
    <>
      <Polyline positions={points} pathOptions={{ color: "black", weight: "0.5" }} />
      <Marker position={midpoint} icon={LinkIcon}>
        <Popup>
          <Heading textAlign="center" size="sm">Relationship between {query.name} and {person.name}</Heading>
          {person.one_to_many &&
            <p>
              <Subheading>from wikipedia article about {query.name}:</Subheading>
              <SummaryPart text={person.one_to_many} link={query.wikipedia} />
            </p>}
          {person.many_to_one &&
            <p>
              <Subheading>from wikipedia article about {person.name}:</Subheading>
              <SummaryPart text={person.many_to_one} link={person.wikipedia} />
            </p>}
        </Popup>
      </Marker>
    </>
  );
};

export default Connection