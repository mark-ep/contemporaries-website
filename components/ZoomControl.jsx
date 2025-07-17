import { ButtonGroup, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FaExpand, FaMinus, FaPlus } from 'react-icons/fa';
import { useMap } from 'react-leaflet';
import { useBounds } from '../contexts/MapContext';
import { useOnZoomChange, useSetZoomTo } from "../helpers/zoomTo";


/*
 * based on https://angelos.dev/2021/07/zoom-control-with-reset-component-for-react-leaflet/
 */

export const ZoomControlButton = (props) => (
  <IconButton
    rounded="full"
    m="4pt"
    boxShadow="md"
    // color="blue.500"
    // role="button"
    {...props}
  />
);
// ZoomControlButton.PropTypes = IconButtonProps;

export const ZoomInButton = ({ onClick }) => (
  <ZoomControlButton
    aria-label="Zoom In"
    children={<FaPlus />}
    onClick={onClick}
  />
)
export const ZoomOutButton = ({ onClick }) => (
  <ZoomControlButton
    aria-label="Zoom Out"
    children={<FaMinus />}
    onClick={onClick}
  />
)
export const ResetViewButton = ({ onClick }) => (
  <ZoomControlButton
    aria-label="Reset View"
    children={<FaExpand />}
    onClick={onClick}
  />
)

function ZoomControlWithReset() {
  const bounds = useBounds();
  const map = useMap();
  useOnZoomChange(map);

  const onZoomIn = e => {
    map.zoomIn();
    e.preventDefault();
  }
  const onZoomOut = e => {
    map.zoomOut();
    e.preventDefault();
  }
  const onResetView = e => {
    map.fitBounds(bounds);
    e.preventDefault()
  }
  // useSetZoomTo(
  //   () => loc => map.setView(loc, 8)
  // );

  useEffect(
    () => {
      if (bounds) {
        // fit to the available bounds
        map.fitBounds(bounds);
      } else {
        map.setView([0, 0], 3);
      }
    },
    [bounds, map] // by adding `bounds` to the dependecy list, this function will be called again when the bounds change
  );

  return (
    <ButtonGroup
      as="div"
      className="leaflet-control"
      colorScheme="blue"
      rounded="full"
      variant="solid"
      flexDir="column"
      zIndex={100}
    >
      <ZoomInButton onClick={onZoomIn} />
      <ZoomOutButton onClick={onZoomOut} />
      <ResetViewButton onClick={onResetView} />
    </ButtonGroup>
  );
}

export default ZoomControlWithReset;