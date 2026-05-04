import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import {
  Badge, Box, Container, Divider, Heading, SimpleGrid,
  Stack, Stat, StatLabel, StatNumber, Text,
} from '@chakra-ui/react'
import ImageStack from '../components/Stack'

interface DumpStatus {
  id: number
  state: string
  progress_pct: number
  bytes_processed: number
  bytes_total: number
  started_at: string
  completed_at: string | null
  error: string | null
}

interface DashboardStats {
  persons: number
  aliases: number
  countries: number
  occupations: number
  locations: number
  dirty_locations: number
  dirty_occupations: number
  dump_status: DumpStatus
}

function formatNumber(n: number) {
  return n.toLocaleString()
}

function formatBytes(bytes: number) {
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`
}

const dumpStateColor: Record<string, string> = {
  completed: 'green',
  failed: 'red',
  running: 'yellow',
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
  const dump = stats.dump_status

  return (
    <>
      <Head>
        <title>Dashboard | Contemporaries Network</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ImageStack image="/api/mosaic/" alt="mosaic" minH="100vh">
          <Container maxW="container.lg" py="8">
            <Stack spacing="6" p="6" rounded="xl" bg="blackAlpha.700">
              <Heading>Dashboard</Heading>

              <Heading size="md">Database</Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing="4">
                {([
                  ['Persons', stats.persons],
                  ['Aliases', stats.aliases],
                  ['Countries', stats.countries],
                  ['Occupations', stats.occupations],
                  ['Locations', stats.locations],,
                ] as [string, number][]).map(([label, value]) => {
                  let badge = null;
                  if (label == "Locations") {
                    badge = stats.dirty_locations;
                  } else if (label == "Occupations") {
                    badge = stats.dirty_occupations;
                  }
                  return (
                  <Box key={label} p="4" rounded="md" bg="whiteAlpha.100">
                    <Stat>
                      <StatLabel>{label}</StatLabel>
                      <StatNumber>{formatNumber(value)}</StatNumber>
                      {badge !== null && <Badge colorScheme="gray" gap="0">{badge} pending</Badge>}
                    </Stat>
                  </Box>
                )})}
              </SimpleGrid>

              <Divider />

              <Heading size="md">Data Dump</Heading>
              <Box p="4" rounded="md" bg="whiteAlpha.100">
                <Stack spacing="2">
                  <Stack direction="row" align="center">
                    <Text fontWeight="bold" minW="6em">Status</Text>
                    <Badge colorScheme={dumpStateColor[dump.state] ?? 'gray'}>{dump.state}</Badge>
                  </Stack>
                  <Stack direction="row">
                    <Text fontWeight="bold" minW="6em">Progress</Text>
                    <Text>{dump.progress_pct.toFixed(1)}% &mdash; {formatBytes(dump.bytes_processed)} / {formatBytes(dump.bytes_total)}</Text>
                  </Stack>
                  <Stack direction="row">
                    <Text fontWeight="bold" minW="6em">Started</Text>
                    <Text>{new Date(dump.started_at).toLocaleString()}</Text>
                  </Stack>
                  {dump.completed_at && (
                    <Stack direction="row">
                      <Text fontWeight="bold" minW="6em">Completed</Text>
                      <Text>{new Date(dump.completed_at).toLocaleString()}</Text>
                    </Stack>
                  )}
                  {dump.error && (
                    <Stack direction="row">
                      <Text fontWeight="bold" minW="6em">Error</Text>
                      <Text color="red.300">{dump.error}</Text>
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Container>
        </ImageStack>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_ROOT}dashboard/stats`)
  const stats: DashboardStats = await res.json()
  return { props: { stats } }
}
