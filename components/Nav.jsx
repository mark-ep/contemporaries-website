import { Box, Container, Heading, HStack, Divider, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaFilter } from "react-icons/fa";
// import { ReactComponent as Logo } from "../cnlogo_thin.svg";
import SearchProvider from "../contexts/SearchProvider";
import { AdvancedSearchForm } from "./AdvancedSearch";
import Link from "./Link";
import SearchBox from "./SearchBox";


export const Nav = ({ title, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <SearchProvider>
      <Box
        bg="white"
        shadow="lg"
        width="full"
        py="1ch"
        as="header"
        {...props}
      >
        <Container
          maxW="container.xl"
          alignItems="baseline"
          justifyContent="flex-start"
          px="2ch"
        >
          <HStack>
            <Link href="/">
              <Image src="/cnlogo_thin.svg" alt="contemporaries network" w="100px" />
            </Link>
            <Box w="full">
              <Heading textAlign="left" size={useBreakpointValue({ base: "md", md: "xl" })}>{title}</Heading>
              <HStack>
                <SearchBox maxW="30ch" />
                <IconButton
                  onClick={onOpen}
                  colorScheme="blue"
                  children={<FaFilter />}
                />
              </HStack>
              <HStack divider={<Divider mx="2ex" />} w="min-content">
                <Link href="/about">About</Link>
                <Link href="/about#contact">Contact</Link>
              </HStack>
            </Box>
          </HStack>
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="container.md">
            <ModalHeader>
              <Heading
                bg='blue.500'
                rounded='md'
                color='white'
                px='1ex'
                py='0.5ex'
                mt="2rem"
                size='lg'
              >
                Set Filters
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb='2rem'>
              <AdvancedSearchForm onSubmit={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box >
    </SearchProvider>
  )
}

export default Nav;