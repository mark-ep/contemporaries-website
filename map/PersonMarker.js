import { Button, ButtonGroup, IconButton, Link as ChakraLink, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import * as NextLink from "next/link";
import { FaEyeSlash, FaMapPin, FaWikipediaW } from "react-icons/fa";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { SubjectIcon } from "./icons";
import { useToggleMarker } from "../contexts/MapContext"


export const PersonMarker = ({
  person
}) => {
  /*
   * creates a map marker with content describing one person from the query results
   * parameters are properties returned by server API, plus:
   *   `subjectMarker`: boolean, if set indicates that this marker represents to subject
   *                    of the user's query
   *   `onRemoveMarker`: a callback that will delete the marker from the map when called
   */
  const { name, location, image, description, wikipedia, link, subjectMarker = false } = person;
  const [, onToggleMapped] = useToggleMarker(person);

  // get the coordinates of the person
  const [lat, lon] = location;
  // set additional properties for the marker if this the query subject's marker:
  //    change the icon to the red version and make sure it appears above others
  const props = subjectMarker ? { icon: SubjectIcon, zIndexOffset: 1000 } : {};
  return (
    <Marker position={[lon, lat]} {...props}>
      <Popup style={{ width: "fit-content" }}>
        {/* title: the name of the person */}
        <h3><b><center><font size="+2">{name}</font></center></b></h3>
        {/* image portrait of the person */}
        <p><center><img src={image} width={200} alt={name} /></center></p>
        {/* short description text from wikidata */}
        <p><center>{description}</center></p>
        {/* create control buttons: explore, link to wikipedia, remove from map */}
        <ButtonGroup colorScheme="blue" width="full">
          <Button
            flex={1}
            as={NextLink}
            sx={{ color: "white !important" }}
            href={`${link}`}
            rightIcon={<FaMapPin />}
            minW="fit-content"
            disabled={subjectMarker}
          >
            Explore
          </Button>
          <Button
            flex={1}
            variant="outline"
            as={ChakraLink}
            href={wikipedia}
            target="_blank"
            rightIcon={<FaWikipediaW />}
            minW="fit-content"
          >
            Wikipedia
          </Button>
          <ChakraTooltip label="remove from map">
            <IconButton
              onClick={onToggleMapped}
              children={<FaEyeSlash />}
              aria-label="Remove from map"
              variant="outline" />
          </ChakraTooltip>
        </ButtonGroup>
      </Popup>
      {/* create a tooltip to show the person's name when hovering over the icon */}
      <Tooltip>{name}</Tooltip>
    </Marker>
  );
};

export default PersonMarker