import React from "react";
import * as NextLink from "next/link"
import { Link as ChakraLink } from "@chakra-ui/react"


export const Link = (props) => (
    <ChakraLink as={NextLink} {...props} />
)

export default Link;