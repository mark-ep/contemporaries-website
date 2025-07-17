import React from "react";
import { Text } from "@chakra-ui/react";


export const Subheading = ({ children, ...props }) => (
  // Subheading element
  <Text
    color='gray.500'
    fontWeight='semibold'
    letterSpacing='wide'
    textTransform="uppercase"
    {...props}
  >
    {children}
  </Text>
);