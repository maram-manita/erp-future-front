import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  EmptyState,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  FileText,
  Handshake,
  Pencil,
  Plus,
  User,
} from "lucide-react";

// ─── Configuration ───────────────────────────────

const PROJECT_STATUS = {
  active: { label: "Active", colorPalette: "green" },
  on_hold: { label: "On Hold", colorPalette: "orange" },
  completed: { label: "Completed", colorPalette: "blue" },
  cancelled: { label: "Cancelled", colorPalette: "red" },
  draft: { label: "Draft", colorPalette: "gray" },
};

const CONTRACT_STATUS = {
  draft: { label: "Draft", colorPalette: "gray" },
  active: { label: "Active", colorPalette: "green" },
  suspended: { label: "Suspended", colorPalette: "orange" },
  completed: { label: "Completed", colorPalette: "blue" },
  terminated: { label: "Terminated", colorPalette: "red" },
};

const CONTRACT_TYPE_LABELS = {
  main_contract: "Main Contract",
  service_agreement: "Service Agreement",
  supply_contract: "Supply Contract",
  consulting: "Consulting",
};

const MILESTONE_STATUS = {
  paid: { label: "Paid", colorPalette: "green" },
  pending: { label: "Pending", colorPalette: "gray" },
  overdue: { label: "Overdue", colorPalette: "red" },
};

// ─── Helpers ─────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Mock Data ───────────────────────────────────

const PROJECTS = {
  1: {
    project_code: "PRJ-2024-001",
    project_name: "Marina Bay Tower Construction",
    description:
      "A 42-story mixed-use residential and commercial tower development in the Marina Bay district. The project encompasses structural works, MEP systems, interior fit-out, and landscaping.",
    project_status: "active",
    client: "Bayview Properties Ltd",
    contracting_party: "BuildRight Construction Co.",
    project_manager: "Sarah Chen",
    created_at: "2024-11-15",
    updated_at: "2025-03-08",
    contracts: [
      {
        id: 1,
        contract_code: "CTR-2024-001",
        contract_type: "main_contract",
        contract_status: "active",
        partner: "BuildRight Construction Co.",
        commencement_date: "2024-12-01",
        contract_duration: 24,
        expiry_date: "2026-11-30",
        contract_value: 2450000,
        currency: "USD",
        milestones: [
          {
            id: 1,
            name: "Foundation Complete",
            amount: 490000,
            currency: "USD",
            due_date: "2025-03-01",
            status: "paid",
          },
          {
            id: 2,
            name: "Structural Frame",
            amount: 735000,
            currency: "USD",
            due_date: "2025-09-01",
            status: "pending",
          },
          {
            id: 3,
            name: "Building Envelope",
            amount: 612500,
            currency: "USD",
            due_date: "2026-03-01",
            status: "pending",
          },
          {
            id: 4,
            name: "Final Completion",
            amount: 612500,
            currency: "USD",
            due_date: "2026-11-30",
            status: "pending",
          },
        ],
        subcontracts: [
          {
            id: 10,
            contract_code: "CTR-2024-001-S1",
            contract_status: "active",
            partner: "SteelWorks Fabrication",
            contract_value: 380000,
            currency: "USD",
          },
          {
            id: 11,
            contract_code: "CTR-2024-001-S2",
            contract_status: "active",
            partner: "ProElectric Solutions",
            contract_value: 195000,
            currency: "USD",
          },
        ],
      },
      {
        id: 2,
        contract_code: "CTR-2024-002",
        contract_type: "service_agreement",
        contract_status: "active",
        partner: "DesignPro Architecture",
        commencement_date: "2024-11-25",
        contract_duration: 30,
        expiry_date: "2027-05-25",
        contract_value: 320000,
        currency: "USD",
        milestones: [
          {
            id: 5,
            name: "Schematic Design",
            amount: 96000,
            currency: "USD",
            due_date: "2025-01-15",
            status: "paid",
          },
          {
            id: 6,
            name: "Design Development",
            amount: 96000,
            currency: "USD",
            due_date: "2025-06-15",
            status: "pending",
          },
          {
            id: 7,
            name: "Construction Supervision",
            amount: 128000,
            currency: "USD",
            due_date: "2027-05-25",
            status: "pending",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  2: {
    project_code: "PRJ-2024-002",
    project_name: "Greenfield Office Park — Phase 2",
    description:
      "Second phase of the Greenfield business park development, covering three mid-rise office buildings with shared amenities and underground parking.",
    project_status: "active",
    client: "Metro Development Corp",
    contracting_party: "Metro Development Corp",
    project_manager: "James Rivera",
    created_at: "2024-12-01",
    updated_at: "2025-03-10",
    contracts: [
      {
        id: 3,
        contract_code: "CTR-2024-010",
        contract_type: "main_contract",
        contract_status: "active",
        partner: "Apex Builders Group",
        commencement_date: "2025-01-15",
        contract_duration: 18,
        expiry_date: "2026-07-15",
        contract_value: 1800000,
        currency: "USD",
        milestones: [
          {
            id: 8,
            name: "Site Preparation",
            amount: 360000,
            currency: "USD",
            due_date: "2025-04-01",
            status: "paid",
          },
          {
            id: 9,
            name: "Structural Works",
            amount: 720000,
            currency: "USD",
            due_date: "2025-10-01",
            status: "pending",
          },
          {
            id: 10,
            name: "Final Handover",
            amount: 720000,
            currency: "USD",
            due_date: "2026-07-15",
            status: "pending",
          },
        ],
        subcontracts: [
          {
            id: 20,
            contract_code: "CTR-2024-010-S1",
            contract_status: "active",
            partner: "GreenScape Landscaping",
            contract_value: 145000,
            currency: "USD",
          },
        ],
      },
    ],
  },

  3: {
    project_code: "PRJ-2024-003",
    project_name: "Central Hospital Renovation",
    description:
      "Comprehensive renovation of the East Wing, including updated surgical suites, patient rooms, and compliance upgrades to meet current healthcare facility standards.",
    project_status: "on_hold",
    client: "National Health Authority",
    contracting_party: "National Health Authority",
    project_manager: "Aisha Patel",
    created_at: "2024-10-20",
    updated_at: "2025-02-14",
    contracts: [
      {
        id: 4,
        contract_code: "CTR-2024-015",
        contract_type: "main_contract",
        contract_status: "suspended",
        partner: "MediConstruct Inc.",
        commencement_date: "2024-11-01",
        contract_duration: 12,
        expiry_date: "2025-10-31",
        contract_value: 980000,
        currency: "USD",
        milestones: [
          {
            id: 11,
            name: "Demolition & Prep",
            amount: 196000,
            currency: "USD",
            due_date: "2025-01-15",
            status: "paid",
          },
          {
            id: 12,
            name: "Core Renovation",
            amount: 490000,
            currency: "USD",
            due_date: "2025-06-01",
            status: "overdue",
          },
          {
            id: 13,
            name: "Final Fit-Out",
            amount: 294000,
            currency: "USD",
            due_date: "2025-10-31",
            status: "pending",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  4: {
    project_code: "PRJ-2025-001",
    project_name: "Riverside Mall Interior Fit-Out",
    description:
      "Complete interior fit-out for 45 retail units across three floors, including common areas, food court, and customer amenities.",
    project_status: "active",
    client: "Sunrise Retail Group",
    contracting_party: "Sunrise Retail Group",
    project_manager: "David Kim",
    created_at: "2025-01-10",
    updated_at: "2025-03-09",
    contracts: [
      {
        id: 5,
        contract_code: "CTR-2025-003",
        contract_type: "main_contract",
        contract_status: "active",
        partner: "InteriorCraft Solutions",
        commencement_date: "2025-02-01",
        contract_duration: 10,
        expiry_date: "2025-11-30",
        contract_value: 650000,
        currency: "USD",
        milestones: [
          {
            id: 14,
            name: "Common Areas",
            amount: 195000,
            currency: "USD",
            due_date: "2025-05-01",
            status: "pending",
          },
          {
            id: 15,
            name: "Retail Units — L1 & L2",
            amount: 260000,
            currency: "USD",
            due_date: "2025-08-01",
            status: "pending",
          },
          {
            id: 16,
            name: "Final Completion",
            amount: 195000,
            currency: "USD",
            due_date: "2025-11-30",
            status: "pending",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  5: {
    project_code: "PRJ-2024-004",
    project_name: "Highway Extension — Section C",
    description:
      "Construction of a 12 km highway extension connecting the Northern Industrial District to the central ring road, including two interchanges and a pedestrian overpass.",
    project_status: "completed",
    client: "Department of Transport",
    contracting_party: "Department of Transport",
    project_manager: "Sarah Chen",
    created_at: "2024-06-15",
    updated_at: "2025-01-30",
    contracts: [
      {
        id: 6,
        contract_code: "CTR-2024-005",
        contract_type: "main_contract",
        contract_status: "completed",
        partner: "RoadTech Engineering",
        commencement_date: "2024-07-01",
        contract_duration: 6,
        expiry_date: "2024-12-31",
        contract_value: 3200000,
        currency: "USD",
        milestones: [
          {
            id: 17,
            name: "Earthworks & Grading",
            amount: 960000,
            currency: "USD",
            due_date: "2024-08-15",
            status: "paid",
          },
          {
            id: 18,
            name: "Pavement & Surfacing",
            amount: 1280000,
            currency: "USD",
            due_date: "2024-10-30",
            status: "paid",
          },
          {
            id: 19,
            name: "Signage & Handover",
            amount: 960000,
            currency: "USD",
            due_date: "2024-12-31",
            status: "paid",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  6: {
    project_code: "PRJ-2025-002",
    project_name: "Smart Campus Network Installation",
    description:
      "Design and installation of a campus-wide IoT network infrastructure for TechVision University, including fiber backbone, wireless access points, and smart building integration.",
    project_status: "draft",
    client: "TechVision University",
    project_manager: "Aisha Patel",
    created_at: "2025-02-20",
    updated_at: "2025-02-20",
    contracts: [],
  },

  7: {
    project_code: "PRJ-2024-005",
    project_name: "Waterfront Promenade Design",
    description:
      "Urban design and construction of a 2.5 km waterfront promenade with public spaces, cycling paths, and recreational facilities.",
    project_status: "completed",
    client: "City Council",
    contracting_party: "City Council",
    project_manager: "James Rivera",
    created_at: "2024-03-10",
    updated_at: "2024-12-15",
    contracts: [
      {
        id: 7,
        contract_code: "CTR-2024-008",
        contract_type: "service_agreement",
        contract_status: "completed",
        partner: "UrbanVista Design Studio",
        commencement_date: "2024-04-01",
        contract_duration: 8,
        expiry_date: "2024-11-30",
        contract_value: 1500000,
        currency: "USD",
        milestones: [
          {
            id: 20,
            name: "Concept Design",
            amount: 375000,
            currency: "USD",
            due_date: "2024-05-15",
            status: "paid",
          },
          {
            id: 21,
            name: "Detailed Design",
            amount: 450000,
            currency: "USD",
            due_date: "2024-08-01",
            status: "paid",
          },
          {
            id: 22,
            name: "Construction Support",
            amount: 675000,
            currency: "USD",
            due_date: "2024-11-30",
            status: "paid",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  8: {
    project_code: "PRJ-2025-003",
    project_name: "Industrial Zone Remediation",
    description:
      "Environmental remediation of a 15-hectare former industrial site, including soil treatment, groundwater monitoring, and habitat restoration.",
    project_status: "active",
    client: "Greenland Environmental",
    contracting_party: "Greenland Environmental",
    project_manager: "David Kim",
    created_at: "2025-01-25",
    updated_at: "2025-03-07",
    contracts: [
      {
        id: 8,
        contract_code: "CTR-2025-001",
        contract_type: "main_contract",
        contract_status: "active",
        partner: "EnviroClean Corp",
        commencement_date: "2025-02-15",
        contract_duration: 14,
        expiry_date: "2026-04-15",
        contract_value: 890000,
        currency: "USD",
        milestones: [
          {
            id: 23,
            name: "Assessment & Planning",
            amount: 133500,
            currency: "USD",
            due_date: "2025-04-01",
            status: "pending",
          },
          {
            id: 24,
            name: "Soil Treatment",
            amount: 445000,
            currency: "USD",
            due_date: "2025-10-01",
            status: "pending",
          },
          {
            id: 25,
            name: "Monitoring & Closure",
            amount: 311500,
            currency: "USD",
            due_date: "2026-04-15",
            status: "pending",
          },
        ],
        subcontracts: [
          {
            id: 30,
            contract_code: "CTR-2025-001-S1",
            contract_status: "active",
            partner: "AquaTest Laboratories",
            contract_value: 68000,
            currency: "USD",
          },
        ],
      },
    ],
  },

  9: {
    project_code: "PRJ-2024-006",
    project_name: "Heritage Building Restoration",
    description:
      "Restoration of a 19th-century heritage-listed courthouse, including structural stabilisation, facade repair, and interior conservation.",
    project_status: "cancelled",
    client: "Heritage Trust Foundation",
    contracting_party: "Heritage Trust Foundation",
    project_manager: "Sarah Chen",
    created_at: "2024-08-05",
    updated_at: "2024-11-20",
    contracts: [
      {
        id: 9,
        contract_code: "CTR-2024-012",
        contract_type: "consulting",
        contract_status: "terminated",
        partner: "ReStore Heritage Consulting",
        commencement_date: "2024-09-01",
        contract_duration: 18,
        expiry_date: "2026-02-28",
        contract_value: 720000,
        currency: "USD",
        milestones: [
          {
            id: 26,
            name: "Assessment Report",
            amount: 108000,
            currency: "USD",
            due_date: "2024-10-15",
            status: "paid",
          },
          {
            id: 27,
            name: "Restoration Plan",
            amount: 216000,
            currency: "USD",
            due_date: "2025-02-01",
            status: "pending",
          },
        ],
        subcontracts: [],
      },
    ],
  },

  10: {
    project_code: "PRJ-2025-004",
    project_name: "Solar Farm — Northern District",
    description:
      "Design and construction of a 50 MW solar photovoltaic farm with battery storage and grid connection infrastructure.",
    project_status: "draft",
    client: "CleanEnergy Partners",
    project_manager: "James Rivera",
    created_at: "2025-03-01",
    updated_at: "2025-03-01",
    contracts: [],
  },
};

export function getProjectName(id) {
  return PROJECTS[id]?.project_name || null;
}

// ─── Sub-components ──────────────────────────────

function InfoField({ icon: Icon, label, children }) {
  return (
    <Flex align="flex-start" gap="10px" py="7px">
      <Flex align="center" gap="8px" minW="150px" flexShrink={0}>
        {Icon && (
          <Box
            color="gray.400"
            display="flex"
            alignItems="center"
            flexShrink={0}
          >
            <Icon size={14} strokeWidth={1.5} />
          </Box>
        )}
        <Text fontSize="13px" color="gray.500" fontWeight="500">
          {label}
        </Text>
      </Flex>
      <Box fontSize="13px" color="gray.800" fontWeight="500">
        {children}
      </Box>
    </Flex>
  );
}

function MilestoneRow({ milestone }) {
  const isPaid = milestone.status === "paid";
  const StatusIcon = isPaid ? CheckCircle2 : Circle;
  const iconColor = isPaid
    ? "green.500"
    : milestone.status === "overdue"
      ? "red.400"
      : "gray.300";
  const ms = MILESTONE_STATUS[milestone.status];

  return (
    <Flex align="center" gap="10px" py="6px">
      <Box color={iconColor} display="flex" alignItems="center" flexShrink={0}>
        <StatusIcon size={14} strokeWidth={isPaid ? 2.5 : 1.5} />
      </Box>
      <Text
        fontSize="12.5px"
        color={isPaid ? "gray.500" : "gray.700"}
        fontWeight="500"
        flex="1"
      >
        {milestone.name}
      </Text>
      <Text
        fontSize="12.5px"
        color="gray.600"
        fontWeight="500"
        minW="80px"
        textAlign="right"
      >
        {formatCurrency(milestone.amount, milestone.currency)}
      </Text>
      <Text fontSize="11.5px" color="gray.400" minW="75px" textAlign="right">
        {formatDate(milestone.due_date)}
      </Text>
      <Badge
        size="xs"
        variant="subtle"
        colorPalette={ms?.colorPalette || "gray"}
        borderRadius="full"
        fontSize="10px"
        px="6px"
      >
        {ms?.label || milestone.status}
      </Badge>
    </Flex>
  );
}

function SubcontractRow({ subcontract }) {
  const sc = CONTRACT_STATUS[subcontract.contract_status];

  return (
    <Flex align="center" gap="10px" py="6px">
      <Text fontSize="12px" fontFamily="mono" color="gray.500" fontWeight="500">
        {subcontract.contract_code}
      </Text>
      <Text color="gray.300" fontSize="10px">
        ·
      </Text>
      <Text fontSize="12.5px" color="gray.700" fontWeight="500" flex="1">
        {subcontract.partner}
      </Text>
      <Text fontSize="12.5px" color="gray.600" fontWeight="500">
        {formatCurrency(subcontract.contract_value, subcontract.currency)}
      </Text>
      <Badge
        size="xs"
        variant="subtle"
        colorPalette={sc?.colorPalette || "gray"}
        borderRadius="full"
        fontSize="10px"
        px="6px"
      >
        {sc?.label || subcontract.contract_status}
      </Badge>
    </Flex>
  );
}

function ContractCard({ contract }) {
  const typeLabel =
    CONTRACT_TYPE_LABELS[contract.contract_type] || contract.contract_type;
  const cs = CONTRACT_STATUS[contract.contract_status];
  const hasMilestones = contract.milestones?.length > 0;
  const hasSubcontracts = contract.subcontracts?.length > 0;

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      overflow="hidden"
    >
      {/* Card header */}
      <Flex
        align="center"
        px="16px"
        py="12px"
        bg="gray.50"
        borderBottomWidth="1px"
        borderColor="gray.100"
        gap="8px"
        flexWrap="wrap"
      >
        <Text
          fontSize="12.5px"
          fontFamily="mono"
          fontWeight="600"
          color="gray.600"
        >
          {contract.contract_code}
        </Text>
        <Badge
          variant="outline"
          size="xs"
          borderRadius="full"
          fontSize="10.5px"
          fontWeight="500"
          colorPalette="gray"
        >
          {typeLabel}
        </Badge>
        <Badge
          size="xs"
          variant="subtle"
          colorPalette={cs?.colorPalette || "gray"}
          borderRadius="full"
          fontSize="10.5px"
          fontWeight="600"
          px="7px"
        >
          {cs?.label || contract.contract_status}
        </Badge>
      </Flex>

      {/* Card body */}
      <Box px="16px" py="14px">
        {/* Partner */}
        <Flex align="center" gap="8px" mb="12px">
          <Box
            color="gray.400"
            display="flex"
            alignItems="center"
            flexShrink={0}
          >
            <Handshake size={14} strokeWidth={1.5} />
          </Box>
          <Text fontSize="13px" color="gray.700" fontWeight="600">
            {contract.partner}
          </Text>
        </Flex>

        {/* Value + Timeline */}
        <Flex gap="20px" flexWrap="wrap">
          <Flex align="center" gap="6px">
            <Box color="gray.400" display="flex" alignItems="center">
              <DollarSign size={13} strokeWidth={1.5} />
            </Box>
            <Text fontSize="13px" color="gray.700" fontWeight="600">
              {formatCurrency(contract.contract_value, contract.currency)}
            </Text>
            <Text fontSize="11.5px" color="gray.400">
              {contract.currency}
            </Text>
          </Flex>
          <Flex align="center" gap="6px">
            <Box color="gray.400" display="flex" alignItems="center">
              <Calendar size={13} strokeWidth={1.5} />
            </Box>
            <Text fontSize="12.5px" color="gray.600">
              {formatDate(contract.commencement_date)} →{" "}
              {formatDate(contract.expiry_date)}
            </Text>
          </Flex>
          {contract.contract_duration && (
            <Flex align="center" gap="6px">
              <Box color="gray.400" display="flex" alignItems="center">
                <Clock size={13} strokeWidth={1.5} />
              </Box>
              <Text fontSize="12.5px" color="gray.600">
                {contract.contract_duration} months
              </Text>
            </Flex>
          )}
        </Flex>

        {/* Payment Milestones */}
        {hasMilestones && (
          <Box mt="16px" pt="12px" borderTopWidth="1px" borderColor="gray.100">
            <Flex align="center" gap="6px" mb="6px">
              <Text
                fontSize="11px"
                fontWeight="600"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.05em"
              >
                Payment Milestones
              </Text>
              <Text fontSize="11px" color="gray.400">
                ({contract.milestones.length})
              </Text>
            </Flex>
            <VStack align="stretch" gap="0">
              {contract.milestones.map((ms) => (
                <MilestoneRow key={ms.id} milestone={ms} />
              ))}
            </VStack>
          </Box>
        )}

        {/* Subcontracts */}
        {hasSubcontracts && (
          <Box mt="14px" pt="12px" borderTopWidth="1px" borderColor="gray.100">
            <Flex align="center" gap="6px" mb="6px">
              <Text
                fontSize="11px"
                fontWeight="600"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="0.05em"
              >
                Subcontracts
              </Text>
              <Text fontSize="11px" color="gray.400">
                ({contract.subcontracts.length})
              </Text>
            </Flex>
            <VStack align="stretch" gap="0">
              {contract.subcontracts.map((sc) => (
                <SubcontractRow key={sc.id} subcontract={sc} />
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── Main Component ──────────────────────────────

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS[id];

  if (!project) {
    return (
      <Flex minH="full" align="center" justify="center">
        <VStack gap={3} textAlign="center">
          <Heading size="md" color="gray.700" fontFamily="body">
            Project not found
          </Heading>
          <Text color="gray.500" fontSize="sm">
            The project you are looking for does not exist.
          </Text>
          <Button asChild mt={2} colorPalette="brand" size="sm">
            <RouterLink to="/projects">Back to Projects</RouterLink>
          </Button>
        </VStack>
      </Flex>
    );
  }

  const statusCfg = PROJECT_STATUS[project.project_status];
  const hasContracts = project.contracts?.length > 0;

  return (
    <Box px="26px" py="20px">
      {/* ── Header ── */}
      <Flex align="flex-start" justify="space-between" mb="24px">
        <Box>
          <Heading
            as="h1"
            fontSize="20px"
            fontWeight="700"
            color="gray.800"
            fontFamily="body"
            letterSpacing="-0.01em"
            mb="6px"
          >
            {project.project_name}
          </Heading>
          <Flex align="center" gap="8px">
            <Text
              fontSize="12.5px"
              fontFamily="mono"
              color="gray.500"
              fontWeight="500"
            >
              {project.project_code}
            </Text>
            {statusCfg && (
              <Badge
                size="sm"
                variant="subtle"
                colorPalette={statusCfg.colorPalette}
                borderRadius="full"
                px="2.5"
                fontSize="11px"
                fontWeight="600"
              >
                {statusCfg.label}
              </Badge>
            )}
          </Flex>
        </Box>
        <Button
          size="sm"
          variant="outline"
          gap="6px"
          fontSize="13px"
          fontWeight="500"
        >
          <Pencil size={13} strokeWidth={2} />
          Edit
        </Button>
      </Flex>

      {/* ── Project Details ── */}
      <Box mb="24px">
        <Text
          fontSize="11px"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="0.05em"
          mb="8px"
        >
          Project Details
        </Text>
        <VStack align="stretch" gap="0">
          <InfoField icon={Building2} label="Client">
            {project.client}
          </InfoField>
          {project.contracting_party && (
            <InfoField icon={Handshake} label="Contracting Party">
              {project.contracting_party}
            </InfoField>
          )}
          <InfoField icon={User} label="Project Manager">
            {project.project_manager}
          </InfoField>
          <InfoField icon={Calendar} label="Created">
            {formatDate(project.created_at)}
          </InfoField>
          <InfoField icon={Clock} label="Last Updated">
            {formatDate(project.updated_at)}
          </InfoField>
          {project.description && (
            <InfoField icon={FileText} label="Description">
              <Text color="gray.600" lineHeight="1.6">
                {project.description}
              </Text>
            </InfoField>
          )}
        </VStack>
      </Box>

      {/* ── Divider ── */}
      <Box borderBottomWidth="1px" borderColor="gray.100" mb="24px" />

      {/* ── Contracts ── */}
      <Box>
        <Flex align="center" justify="space-between" mb="16px">
          <Flex align="center" gap="8px">
            <Text
              fontSize="11px"
              fontWeight="600"
              color="gray.400"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              Contracts
            </Text>
            {hasContracts && (
              <Badge
                variant="subtle"
                colorPalette="gray"
                borderRadius="full"
                fontSize="11px"
                fontWeight="600"
                px="7px"
              >
                {project.contracts.length}
              </Badge>
            )}
          </Flex>
          <Button
            size="xs"
            variant="ghost"
            colorPalette="brand"
            gap="4px"
            fontSize="12.5px"
            fontWeight="600"
          >
            <Plus size={13} strokeWidth={2.5} />
            Add Contract
          </Button>
        </Flex>

        {hasContracts ? (
          <VStack gap="12px" align="stretch">
            {project.contracts.map((c) => (
              <ContractCard key={c.id} contract={c} />
            ))}
          </VStack>
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py="48px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            borderStyle="dashed"
          >
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <FileText size={28} strokeWidth={1.5} />
                </EmptyState.Indicator>
                <VStack textAlign="center" gap="1">
                  <EmptyState.Title fontSize="md" fontWeight="600">
                    No contracts yet
                  </EmptyState.Title>
                  <EmptyState.Description fontSize="sm" color="gray.500">
                    Add a contract to start tracking agreements for this
                    project.
                  </EmptyState.Description>
                </VStack>
                <Button colorPalette="brand" size="sm" mt="2" gap="6px">
                  <Plus size={14} strokeWidth={2.5} />
                  Add Contract
                </Button>
              </EmptyState.Content>
            </EmptyState.Root>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
