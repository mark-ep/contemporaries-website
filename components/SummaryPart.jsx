import React from "react";
import { Text, Link as ChakraLink, Box, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";


export const SummaryPart = ({ text, link }) => {
    /*
     * returns one wikipedia text summary from provided `text` with
     * a link to the article `link` rendered using an external link icon
     */
    if (!text)
        return null;
    return (
        <Box borderLeft="4pt solid" borderLeftColor="gray.300" pl="4pt">
            <Text as="blockquote" fontStyle="italic" textAlign="justify">
                {text}<br />
                <Button
                    colorScheme="blue"
                    rightIcon={<FaExternalLinkAlt />}
                    variant="link"
                    size="xs"
                    aria-label="source"
                    as={ChakraLink}
                    href={link}
                    target="_blank"
                    isTruncated
                    maxW="100%"
                >
                    from {link}
                </Button>
                {/* {link && <IconButton
                    colorScheme="blue"
                    icon={<FaExternalLinkAlt />}
                    variant="link"
                    size="xs"
                    aria-label="source"
                    as={ChakraLink}
                    href={link}
                    target="_blank" />} */}
            </Text>
        </Box>
    );
};
