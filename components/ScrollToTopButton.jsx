import React, { useCallback, useState, useEffect } from "react";
import { Tooltip, IconButton, Box } from "@chakra-ui/react";
import { FaAngleDoubleUp } from "react-icons/fa"
import scrollToTop from "../helpers/scrollToTop";

export const ScrollToTopButton = ({ label = "Return to top" }) => {
  const [visible, setVisible] = useState(false);

  const scrollListener = () => {
    const scrollPosition = document.documentElement.scrollTop;
    setVisible(scrollPosition > 300);
  }

  useEffect(
    () => window.addEventListener("scroll", scrollListener),
    []
  );
  const onClick = useCallback(
    () => {
      setVisible(false);
      scrollToTop();
    }, []
  )

  return (
    <Box
      zIndex={2000}
      position="fixed"
      bottom="40px"
      right="40px"
      transition="opacity 300ms ease"
      opacity={visible ? 1 : 0}
    >
      <Tooltip
        label={label}
      >
        <IconButton
          aria-label={label}
          borderRadius="full"
          children={<FaAngleDoubleUp />}
          onClick={onClick}
          colorScheme="blue"
          boxShadow="md"
        />
      </Tooltip>
    </Box>
  )
}

export default ScrollToTopButton;