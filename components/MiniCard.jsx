import { Avatar, HStack, VStack, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import { formatYear } from "../helpers/formatYear";
import { useSearchParams } from "../contexts/SearchProvider";

export const MiniCard = ({ person, onClick }) => {
  const params = useSearchParams();
  const death_year = !!person.died_on ? formatYear(person.death_year) : "present";

  return (
    <Link
      href={{
        pathname: "/[person]",
        query: { person: person.link.slice(1), ...params }
      }}
      onClick={onClick}
    >
      <HStack p="1ex" _hover={{ bg: "blue.500", color: "white", ".dates": { color: "gray.300" } }} cursor="pointer" borderRadius="md">
        <Avatar src={person.image} name={person.name} size="lg" />
        <VStack flex={1} alignItems="stretch">
          <HStack alignItems="baseline" justifyContent="flex-start">
            <Heading size="md">{person.name}</Heading>
            <Text
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              className="dates"
            >{formatYear(person.birth_year)} — {death_year}</Text>
          </HStack>
          <Text textAlign="left">
            {person.description}
          </Text>
        </VStack>
      </HStack>
    </Link >
  )
}

export default MiniCard