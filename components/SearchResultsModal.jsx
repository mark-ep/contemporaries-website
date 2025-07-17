import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, StackDivider, VStack } from "@chakra-ui/react"
import { useSearchResults } from "../contexts/SearchProvider"
import MiniCard from "./MiniCard";

export const SearchResultsModal = ({ isOpen, onClose }) => {
  const results = useSearchResults();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="container.md">
        <ModalHeader>Search Results</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack divider={<StackDivider my="2pt" />} alignItems="stretch">
            {results?.length > 0 && results.map(
              (person, index) => <MiniCard person={person} key={index.toString()} onClick={onClose} />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}