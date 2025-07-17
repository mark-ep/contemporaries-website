import { Button } from "@chakra-ui/react"
import { FaSearchPlus } from "react-icons/fa"


export const LoadMoreButton = ({ onLoadMore, fetching }) => {
  return (
    <Button
      colorScheme="blue"
      boxShadow="md"
      rightIcon={<FaSearchPlus />}
      isLoading={fetching}
      onClick={onLoadMore}
    >
      Load more results
    </Button>
  )
}