import { Box, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, Skeleton, Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import { Combobox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useField } from "formik";
import { useCallback, useMemo, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import urlcat from "urlcat";


export const DropdownField = ({ label, helper, endpoint, refetch, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const component = refetch ? (
    <RefetchingDropdown
      endpoint={endpoint}
      placeholder={props.placeholder}
      selectedItems={field.value}
      onSelectedItemsChange={helpers.setValue}
    />
  ) : (
    <SimpleDropdown
      endpoint={endpoint}
      placeholder={props.placeholder}
      selectedItems={field.value}
      onSelectedItemsChange={helpers.setValue}
    />
  );
  const showError = !!meta.error && meta.touched

  return (
    <FormControl isInvalid={showError}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
      {component}
      {showError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  )

}

export const RefetchingDropdown = ({ placeholder, endpoint, selectedItems, onSelectedItemsChange }) => {
  const [filterValue, setFilterValue] = useState("");
  const { data: items, loading } = useQuery({
    queryKey: ["options", endpoint, { filterValue }],
    queryFn: () => fetch(
      urlcat(endpoint, { head: filterValue })
    ).then(async res => await res.json())
  })

  if (loading && items.length === 0) {
    return <Skeleton h="1em" />
  }

  return (
    <Dropdown
      placeholder={placeholder}
      filterValue={filterValue}
      onFilterValueChange={setFilterValue}
      selectedItems={selectedItems}
      onSelectedItemsChange={onSelectedItemsChange}
      items={items}
    />
  )
}

export const SimpleDropdown = ({ placeholder, endpoint, selectedItems, onSelectedItemsChange }) => {
  const [filterValue, setFilterValue] = useState("");
  const { data, loading } = useQuery({
    queryKey: ["options", endpoint],
    queryFn: () => fetch(endpoint).then(async res => await res.json())
  });

  const items = useMemo(
    () => (data || []).filter(
      item => !!item && item.toLowerCase().startsWith(
        filterValue.toLowerCase()
      )
    ).slice(0, 50),
    [data, filterValue]
  );

  if (loading) {
    return <Skeleton h="1em" />
  }

  return (
    <Dropdown
      placeholder={placeholder}
      filterValue={filterValue}
      onFilterValueChange={setFilterValue}
      selectedItems={selectedItems}
      onSelectedItemsChange={onSelectedItemsChange}
      items={items}
    />
  )
}

export const Dropdown = ({ placeholder, items, filterValue, onFilterValueChange, selectedItems, onSelectedItemsChange }) => {
  const removeItem = useCallback(
    item => {
      onSelectedItemsChange(
        selectedItems.filter(other => other !== item)
      )
    },
    [onSelectedItemsChange, selectedItems]
  )

  return (
    <Combobox value={selectedItems} onChange={onSelectedItemsChange} multiple>
      {({ open, activeIndex }) => (
        <>
          <Wrap my="1ex">
            {selectedItems.map(item => (
              <WrapItem key={item} as={Tag} colorScheme="blue" pt="2pt">
                <TagLabel>{item}</TagLabel>
                <TagCloseButton onClick={() => removeItem(item)} />
              </WrapItem>
            ))}
          </Wrap>
          <InputGroup>
            <Combobox.Input
              onChange={e => onFilterValueChange(e.target.value)}
              value={filterValue}
              placeholder={placeholder}
              as={Input}
              flex={1}
              bg="white"
              color="black"
              borderBottomRadius={open && "none"}
            />
            <InputRightElement w="min-content">
              <Combobox.Button
                as={IconButton}
                colorScheme="blue"
                variant="ghost"
                borderLeftRadius="none"
              >
                <Box
                  transition="transform ease 150ms"
                  transform={`rotate(${open ? 180 : 0}deg)`}
                >
                  <FaChevronDown />
                </Box>
              </Combobox.Button>
            </InputRightElement>
          </InputGroup>

          {open && (
            <Combobox.Options static as={Box} position="relative">
              <Card bg="white" color="black" borderTopRadius="none" w="full" position="absolute" zIndex={1000} overflow="hidden">
                <CardBody maxH="20em" overflowY="auto" p="none" as={List}>
                  {items?.length > 0 && items.map((item, index) =>
                    <Combobox.Option
                      key={item}
                      value={item}
                      as={ListItem}
                      py="4pt"
                      px="1em"
                      cursor="pointer"
                      bg={index === activeIndex ? "blue.500" : null}
                      color={index === activeIndex ? "white" : null}
                    >
                      <ListIcon
                        children={<FaCheck />}
                        color="green.500"
                        opacity={selectedItems.includes(item) ? 1 : 0}
                        transition="opacity ease 150ms"
                      />
                      {item}
                    </Combobox.Option>
                  )}
                </CardBody>
              </Card>
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  )
}

export default Dropdown