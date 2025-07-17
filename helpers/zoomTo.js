import { atom, useAtom } from "jotai"
import { useCallback, useEffect } from "react";
import scrollToTop from "./scrollToTop";

export const zoomTargetAtom = atom(null);

export const useOnZoomChange = (map) => {
  const [zoomTarget,] = useAtom(zoomTargetAtom);

  useEffect(
    () => {
      if (zoomTarget) {
        map.setView(zoomTarget, 8);
        scrollToTop();
      }
    },
    [map, zoomTarget]
  );
}

export const useOnZoomTo = (target) => {
  const [, setZoomTarget] = useAtom(zoomTargetAtom);
  return useCallback(
    () => {
      const [lat, lon] = target;
      setZoomTarget([lon, lat]);
    }, [target, setZoomTarget]
  )
}
