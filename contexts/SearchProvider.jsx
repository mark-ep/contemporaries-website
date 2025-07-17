import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useState } from "react";
import urlcat from "urlcat";
import { SearchResultsModal } from "../components/SearchResultsModal";

export const SearchResultsContext = createContext([]);
export const SearchParamsContext = createContext({});
export const OnSearchContext = createContext(async () => { });

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [params, setParams] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { mutateAsync: get } = useMutation(
    query => fetch(
      urlcat("/api/contemporaries/search", query)
    ).then(async res => await res.json())
  )
  // const { get } = useFetch(
  //   urlcat(API_ROOT, "contemporaries/search")
  // )
  // const navigate = useNavigate();
  const toast = useToast();

  const onSearch = useCallback(
    async (query, params) => {
      console.log(params)
      setParams(params);
      const response = await get(query);

      if (!response || response.length === 0) {
        toast({
          status: "error",
          isClosable: true,
          title: "No results found",
          description: `No results found for "${query}".`,
        })
      } else if (response.length === 1) {
        router.push(
          {
            pathname: "/[query]",
            query: { query: response[0].link.slice(1), ...params }
          }
        );
      } else {
        setResults(response);
        onOpen();
      }
    },
    [get, setParams, setResults, router, onOpen, toast]
  )

  return (
    <SearchResultsContext.Provider value={results}>
      <SearchParamsContext.Provider value={params}>
        <OnSearchContext.Provider value={onSearch}>
          {children}
        </OnSearchContext.Provider>
        <SearchResultsModal isOpen={isOpen} onClose={onClose} />
      </SearchParamsContext.Provider>
    </SearchResultsContext.Provider>
  )
}

export const useSearchResults = () => useContext(SearchResultsContext);
export const useSearchParams = () => useContext(SearchParamsContext);
export const useOnSearch = () => useContext(OnSearchContext);

export default SearchProvider;