import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useOnSearch } from "../contexts/SearchProvider";


export const SearchBox = ({ autoFocus, ...props }) => {
  const onSearch = useOnSearch();

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={async ({ query }) => {
        await onSearch(query, {});
      }}
    >
      {
        formik => (
          <InputGroup as={Form} {...props}>
            <Input
              {...formik.getFieldProps("query")}
              placeholder="Search for a person"
              bg="white"
              color="black"
              autoFocus={autoFocus}
            />
            <InputRightElement>
              <IconButton
                icon={<FaSearch />}
                borderLeftRadius="none"
                type="submit"
                aria-label="search"
                colorScheme="blue"
                isLoading={formik.isSubmitting}
              />
            </InputRightElement>
          </InputGroup>
        )
      }
    </Formik>
  );
}

export default SearchBox;