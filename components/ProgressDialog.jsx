import {
  Progress,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from "@chakra-ui/react"
// import { useAtom } from "jotai"
// import { loadingAtom, progressAtom } from "../helpers/useData"
// import { useProgress } from "../contexts/RequestProvider"

export const LoadingProgress = ({ state, progress, total }) => (
  <VStack mb="2ex">
    <Text
      w="full"
      textAlign="center"
    >{state}</Text>
    <Progress
      max={total}
      value={progress}
      isIndeterminate={!progress}
      width="full"
      size="lg"
      hasStripe
      isAnimated
    />
  </VStack>
)

export const ProgressModal = ({ loading, ...progress }) => {
  // const loadingState = useProgress();
  // const [loading,] = useAtom(loadingAtom);
  // const [progress,] = useAtom(progressAtom);
  return (
    <Modal isOpen={loading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loading...</ModalHeader>
        <ModalBody>
          <LoadingProgress {...progress} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ProgressModal;