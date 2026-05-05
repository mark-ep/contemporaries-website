import { Button } from "@chakra-ui/react"
import { FaSearchPlus } from "react-icons/fa"


export const LoadMoreButton = ({ onLoadMore, fetching, disabled }) => {
  return (
    <Button
      colorScheme="blue"
      boxShadow="md"
      rightIcon={<FaSearchPlus />}
      isLoading={fetching}
      onClick={onLoadMore}
      isDisabled={disabled}
    >
      Load more results
    </Button>
  )
}