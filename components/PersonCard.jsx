import React from "react"
import { Stack, Flex, Heading, Text, Divider, Avatar, Link as ChakraLink, Button, ButtonGroup, Tooltip, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { FaEyeSlash, FaMap, FaMapMarkerAlt, FaWikipediaW, FaCrosshairs } from "react-icons/fa"
import * as NextLink from "next/link"
import { Subheading } from "./Subheading"
import { formatYear } from "../helpers/formatYear"
import { SummaryPart } from "./SummaryPart"
import { useOnZoomTo } from "../helpers/zoomTo"
import { useToggleMarker } from "../contexts/MapContext"

export const Summaries = ({ person, queryArticle }) => {
  return <>
    <SummaryPart text={person.one_to_many} link={queryArticle} />
    <SummaryPart text={person.many_to_one} link={person.wikipedia} />
  </>
}


export const PersonCard = ({ person, query, isHighlighted = false }) => {
  const [mapped, onToggleMapped] = useToggleMarker(person);
  // const mapped = true;
  // const onToggleMapped = () => { }
  const onZoomTo = useOnZoomTo(person.location);
  const death_year = !!person.died_on ? formatYear(person.death_year) : "present";
  const showSummary = !!person.many_to_one || !!person.one_to_many;
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  // const occupations = person.name === "Vladimir Putin" ? [...person.occupations, "war criminal", "dictator"] : person.occupations;
  return (
    <Stack
      direction={stackDirection}
      p="2ex"
      spacing="2ex"
      shadow="dark-lg"
      zIndex={100}
      borderRadius="xl"
      bg={isHighlighted ? "blue.100" : "white"}
    >
      <Flex w="full" justifyContent="center" flex={0}>
        <Avatar src={person.image} name={person.name} size="2xl" />
      </Flex>
      <Stack flex={1}>
        <Stack direction={stackDirection} alignItems={useBreakpointValue({ base: "stretch", md: "baseline" })}>
          <Heading>{person.name}</Heading>
          <Text
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
          >{formatYear(person.birth_year)} — {death_year}</Text>
        </Stack>
        <Text textAlign="left">
          {person.description}
        </Text>
        <Divider />
        <Stack alignItems="flex-start" textAlign="left">
          <Subheading>
            Country
          </Subheading>
          <Text>
            {person.country || "Unknown"}
          </Text>
          {person.occupations && (
            <>
              <Subheading>Occupations</Subheading>
              <Text>
                {person.occupations.join(" • ")} {person.name === "Vladimir Putin" && <> • <Tooltip label="Slava Ukraini! 🇺🇦">war criminal</Tooltip></>}
              </Text>
            </>)
          }
          {showSummary && (
            <>
              <Subheading>
                Relationship to {query.name}
              </Subheading>
              <Summaries person={person} queryArticle={query.wikipedia} />
            </>
          )}
        </Stack>
        <Divider />
        <ButtonGroup colorScheme="blue">
          <Button
            as={!!person.link ? NextLink : ChakraLink}
            href={person.link || undefined}
            rightIcon={<FaMap />}
            disabled={!person.location || !person.link}
          >
            Explore
          </Button>
          <Button
            variant="outline"
            as={ChakraLink}
            href={person.wikipedia || null}
            target="_blank"
            rightIcon={<FaWikipediaW />}
            disabled={!person.wikipedia}
          >
            Wikipedia
          </Button>
          <Tooltip label={mapped ? "Remove Marker" : "Add to Map"}>
            <IconButton
              aria-label={mapped ? "Remove Marker" : "Add to Map"}
              onClick={onToggleMapped}
              variant={mapped ? "outline" : "solid"}
              disabled={!person.location || isHighlighted}>
              {mapped ? <FaEyeSlash /> : <FaMapMarkerAlt />}
            </IconButton>
          </Tooltip>
          <Tooltip label="Zoom to">
            <IconButton
              onClick={onZoomTo}
              disabled={!isHighlighted && (!person.location || !mapped)}
              aria-label="Zoom to"
            >
              <FaCrosshairs />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>
    </Stack >
  )
}