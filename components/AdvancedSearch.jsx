import { Box, Button, ButtonGroup, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FaSearch, FaUndo } from "react-icons/fa";
import SearchProvider, { useOnSearch } from "../contexts/SearchProvider";
import { DropdownField } from "./Dropdown";
import { SearchBox } from './SearchBox';


export const AdvancedSearch = ({ ...props }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <SearchProvider>
      <Box
        borderRadius="md"
        {...props}
      >
        <Stack spacing="2ex">
          {!isOpen && <SearchBox autoFocus />}
          <Button size="md" onClick={onToggle} colorScheme="blue">Advanced Search</Button>
          {isOpen && <AdvancedSearchForm />}
        </Stack>
      </Box>
    </SearchProvider>
  )
}

export const AdvancedSearchForm = ({ onSubmit }) => {
  const onSearch = useOnSearch();
  return (
    <Formik
      initialValues={{
        shareCountry: false,
        shareJob: false,
        selectedCountries: [],
        selectedJobs: [],
        query: ""
      }}
      onSubmit={async (values) => {
        const { query, shareCountry, shareJob, selectedCountries, selectedJobs } = values;
        let params = {};
        if (shareCountry)
          params["share_country"] = 1;
        if (shareJob)
          params["share_job"] = 1;
        if (selectedCountries.length > 0)
          params["selected_countries"] = JSON.stringify(selectedCountries);
        if (selectedJobs.length > 0)
          params["selected_jobs"] = JSON.stringify(selectedJobs)
        
        await onSearch(query, params);
        if (onSubmit) {
          onSubmit();
        }
      }}
    >
      {formik => (
        <Stack as={Form} spacing="2ex">
          <FormControl isInvalid={formik.errors.query && formik.touched.query}>
            <FormLabel fontWeight="bold">Search query:</FormLabel>
            <FormErrorMessage mb="2pt">{formik.errors.query}</FormErrorMessage>
            <Input
              {...formik.getFieldProps("query")}
              placeholder="Name of person"
              bg="white"
              color="black"
              autoFocus
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Find contemporaries with matching:</FormLabel>
            <Flex>
              <Checkbox mx="1ex" {...formik.getFieldProps("shareCountry")}>Country</Checkbox>
              <Checkbox mx="1ex" {...formik.getFieldProps("shareJob")}>Occupation</Checkbox>
            </Flex>
          </FormControl>
          <DropdownField
            name="selectedJobs"
            label="Filter by occupation:"
            placeholder="Enter occupation"
            endpoint="/api/occupations"
            refetch
          />
          <DropdownField
            name="selectedCountries"
            label="Filter by country:"
            placeholder="Enter country"
            endpoint="/api/countries"
          />
          <ButtonGroup
            colorScheme="blue"
            mt="1ex"
            w="full"
            justifyContent="flex-end"
          >
            <Button
              variant="outline"
              bg="white"
              leftIcon={<FaUndo />}
              onClick={formik.handleReset}
            >
              Reset filters
            </Button>
            <Button
              type="submit"
              leftIcon={<FaSearch />}
              isLoading={formik.isSubmitting}
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
            >
              Search
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Formik>
  )
}