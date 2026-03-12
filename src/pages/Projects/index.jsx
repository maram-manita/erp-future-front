import { useState, useMemo } from 'react'
import {
  Badge,
  Box,
  Button,
  EmptyState,
  Flex,
  Heading,
  Input,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, FolderOpen } from 'lucide-react'

const STATUS_CONFIG = {
  active: { label: 'Active', colorPalette: 'green' },
  on_hold: { label: 'On Hold', colorPalette: 'orange' },
  completed: { label: 'Completed', colorPalette: 'blue' },
  cancelled: { label: 'Cancelled', colorPalette: 'red' },
  draft: { label: 'Draft', colorPalette: 'gray' },
}

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'draft', label: 'Draft' },
]

const MOCK_PROJECTS = [
  {
    id: 1,
    project_code: 'PRJ-2024-001',
    project_name: 'Marina Bay Tower Construction',
    project_status: 'active',
    client: 'Bayview Properties Ltd',
    project_manager: 'Sarah Chen',
    created_at: '2024-11-15',
    updated_at: '2025-03-08',
  },
  {
    id: 2,
    project_code: 'PRJ-2024-002',
    project_name: 'Greenfield Office Park — Phase 2',
    project_status: 'active',
    client: 'Metro Development Corp',
    project_manager: 'James Rivera',
    created_at: '2024-12-01',
    updated_at: '2025-03-10',
  },
  {
    id: 3,
    project_code: 'PRJ-2024-003',
    project_name: 'Central Hospital Renovation',
    project_status: 'on_hold',
    client: 'National Health Authority',
    project_manager: 'Aisha Patel',
    created_at: '2024-10-20',
    updated_at: '2025-02-14',
  },
  {
    id: 4,
    project_code: 'PRJ-2025-001',
    project_name: 'Riverside Mall Interior Fit-Out',
    project_status: 'active',
    client: 'Sunrise Retail Group',
    project_manager: 'David Kim',
    created_at: '2025-01-10',
    updated_at: '2025-03-09',
  },
  {
    id: 5,
    project_code: 'PRJ-2024-004',
    project_name: 'Highway Extension — Section C',
    project_status: 'completed',
    client: 'Department of Transport',
    project_manager: 'Sarah Chen',
    created_at: '2024-06-15',
    updated_at: '2025-01-30',
  },
  {
    id: 6,
    project_code: 'PRJ-2025-002',
    project_name: 'Smart Campus Network Installation',
    project_status: 'draft',
    client: 'TechVision University',
    project_manager: 'Aisha Patel',
    created_at: '2025-02-20',
    updated_at: '2025-02-20',
  },
  {
    id: 7,
    project_code: 'PRJ-2024-005',
    project_name: 'Waterfront Promenade Design',
    project_status: 'completed',
    client: 'City Council',
    project_manager: 'James Rivera',
    created_at: '2024-03-10',
    updated_at: '2024-12-15',
  },
  {
    id: 8,
    project_code: 'PRJ-2025-003',
    project_name: 'Industrial Zone Remediation',
    project_status: 'active',
    client: 'Greenland Environmental',
    project_manager: 'David Kim',
    created_at: '2025-01-25',
    updated_at: '2025-03-07',
  },
  {
    id: 9,
    project_code: 'PRJ-2024-006',
    project_name: 'Heritage Building Restoration',
    project_status: 'cancelled',
    client: 'Heritage Trust Foundation',
    project_manager: 'Sarah Chen',
    created_at: '2024-08-05',
    updated_at: '2024-11-20',
  },
  {
    id: 10,
    project_code: 'PRJ-2025-004',
    project_name: 'Solar Farm — Northern District',
    project_status: 'draft',
    client: 'CleanEnergy Partners',
    project_manager: 'James Rivera',
    created_at: '2025-03-01',
    updated_at: '2025-03-01',
  },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const colHeader = {
  fontSize: '11px',
  fontWeight: '600',
  color: 'gray.500',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  py: '10px',
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status]
  if (!config) return null
  return (
    <Badge
      size="sm"
      variant="subtle"
      colorPalette={config.colorPalette}
      borderRadius="full"
      px="2.5"
      fontSize="11px"
      fontWeight="600"
    >
      {config.label}
    </Badge>
  )
}

export default function Projects() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_PROJECTS.length }
    for (const p of MOCK_PROJECTS) {
      counts[p.project_status] = (counts[p.project_status] || 0) + 1
    }
    return counts
  }, [])

  const filteredProjects = useMemo(() => {
    let result = MOCK_PROJECTS

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.project_status === statusFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.project_name.toLowerCase().includes(q) ||
          p.project_code.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.project_manager.toLowerCase().includes(q)
      )
    }

    return result
  }, [search, statusFilter])

  return (
    <Box px="24px" py="20px">
      {/* ── Page header ── */}
      <Flex align="center" justify="space-between" mb="20px">
        <Flex align="center" gap="10px">
          <Heading
            as="h1"
            fontSize="20px"
            fontWeight="700"
            color="gray.800"
            letterSpacing="-0.01em"
          >
            Projects
          </Heading>
          <Badge
            variant="subtle"
            colorPalette="gray"
            borderRadius="full"
            fontSize="11.5px"
            fontWeight="600"
            px="8px"
          >
            {MOCK_PROJECTS.length}
          </Badge>
        </Flex>
        <Button
          colorPalette="orange"
          size="sm"
          fontWeight="600"
          fontSize="13px"
          gap="6px"
        >
          <Plus size={14} strokeWidth={2.5} />
          New Project
        </Button>
      </Flex>

      {/* ── Filters row ── */}
      <Flex
        align="center"
        justify="space-between"
        gap="16px"
        mb="16px"
        flexWrap="wrap"
      >
        <Flex gap="4px" flexWrap="wrap">
          {STATUS_FILTERS.map((f) => {
            const isActive = statusFilter === f.value
            return (
              <Button
                key={f.value}
                size="xs"
                variant={isActive ? 'subtle' : 'ghost'}
                colorPalette={isActive ? 'orange' : 'gray'}
                borderRadius="full"
                fontWeight={isActive ? '600' : '500'}
                fontSize="12.5px"
                px="12px"
                h="30px"
                onClick={() => setStatusFilter(f.value)}
              >
                {f.label}
                {statusCounts[f.value] != null && (
                  <Text
                    as="span"
                    fontSize="11px"
                    opacity={0.6}
                    ml="4px"
                    fontWeight="500"
                  >
                    {statusCounts[f.value]}
                  </Text>
                )}
              </Button>
            )
          })}
        </Flex>

        <Box position="relative" w="280px" flexShrink={0}>
          <Box
            position="absolute"
            left="10px"
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            display="flex"
            alignItems="center"
            pointerEvents="none"
            zIndex={1}
          >
            <Search size={14} strokeWidth={2} />
          </Box>
          <Input
            size="sm"
            pl="32px"
            placeholder="Search by name, code, client..."
            borderRadius="md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Flex>

      {/* ── Table ── */}
      {filteredProjects.length > 0 ? (
        <Box
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="lg"
          overflow="hidden"
        >
          <Table.Root size="sm" interactive>
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader {...colHeader} w="130px">
                  Code
                </Table.ColumnHeader>
                <Table.ColumnHeader {...colHeader}>
                  Project Name
                </Table.ColumnHeader>
                <Table.ColumnHeader {...colHeader}>
                  Client
                </Table.ColumnHeader>
                <Table.ColumnHeader {...colHeader}>
                  Manager
                </Table.ColumnHeader>
                <Table.ColumnHeader {...colHeader} w="100px">
                  Status
                </Table.ColumnHeader>
                <Table.ColumnHeader {...colHeader} w="110px">
                  Created
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredProjects.map((project) => (
                <Table.Row
                  key={project.id}
                  cursor="pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                  _hover={{ bg: 'orange.50/40' }}
                >
                  <Table.Cell>
                    <Text
                      fontSize="12.5px"
                      fontWeight="500"
                      color="gray.500"
                      fontFamily="mono"
                      letterSpacing="-0.01em"
                    >
                      {project.project_code}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      fontSize="13px"
                      fontWeight="600"
                      color="gray.800"
                    >
                      {project.project_name}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="13px" color="gray.600">
                      {project.client}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="13px" color="gray.600">
                      {project.project_manager}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={project.project_status} />
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="12.5px" color="gray.400">
                      {formatDate(project.created_at)}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py="60px"
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="lg"
        >
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <FolderOpen size={32} strokeWidth={1.5} />
              </EmptyState.Indicator>
              <VStack textAlign="center" gap="1">
                <EmptyState.Title fontSize="md" fontWeight="600">
                  No projects found
                </EmptyState.Title>
                <EmptyState.Description fontSize="sm" color="gray.500">
                  {search || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Get started by creating your first project.'}
                </EmptyState.Description>
              </VStack>
              {!search && statusFilter === 'all' && (
                <Button colorPalette="orange" size="sm" mt="2" gap="6px">
                  <Plus size={14} strokeWidth={2.5} />
                  New Project
                </Button>
              )}
            </EmptyState.Content>
          </EmptyState.Root>
        </Flex>
      )}

      {/* ── Table footer ── */}
      {filteredProjects.length > 0 && (
        <Flex justify="flex-end" align="center" mt="12px" px="2px">
          <Text fontSize="12px" color="gray.400">
            Showing {filteredProjects.length} of {MOCK_PROJECTS.length} projects
          </Text>
        </Flex>
      )}
    </Box>
  )
}
