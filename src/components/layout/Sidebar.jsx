import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Menu,
  Portal,
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  FileText,
  ShoppingCart,
  Handshake,
  Building2,
  Truck,
  Archive,
  Users,
  Settings,
  Plus,
  LogOut,
  User,
  ChevronUp,
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/', exact: true },
      { label: 'Projects', icon: FolderOpen, path: '/projects' },
      { label: 'Jobs', icon: ClipboardList, path: '/jobs' },
    ],
  },
  {
    label: 'Commercial',
    items: [
      { label: 'Contracts', icon: FileText, path: '/commercial/contracts' },
      { label: 'Purchase Orders', icon: ShoppingCart, path: '/commercial/purchase-orders' },
      { label: 'Supply Agreements', icon: Handshake, path: '/commercial/supply-agreements' },
    ],
  },
  {
    label: 'Directory',
    items: [
      { label: 'Clients', icon: Building2, path: '/directory/clients' },
      { label: 'Suppliers & Partners', icon: Truck, path: '/directory/suppliers' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Documents', icon: Archive, path: '/documents' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Users & Teams', icon: Users, path: '/admin/users' },
      { label: 'Settings', icon: Settings, path: '/admin' },
    ],
  },
]

function NavItem({ label, icon, path, exact }) {
  const Icon = icon
  const { pathname } = useLocation()
  const isActive = exact
    ? pathname === path
    : pathname === path || pathname.startsWith(path + '/')

  return (
    <Link to={path} style={{ textDecoration: 'none', display: 'block' }}>
      <Flex
        align="center"
        gap="10px"
        px="10px"
        py="8px"
        borderRadius="md"
        bg={isActive ? 'gray.100' : 'transparent'}
        color={isActive ? 'gray.800' : 'gray.600'}
        _hover={{ bg: 'gray.100', color: 'gray.800' }}
        transition="background 0.12s, color 0.12s"
        cursor="pointer"
      >
        <Box flexShrink={0} display="flex" alignItems="center">
          <Icon size={15} strokeWidth={isActive ? 2.5 : 1.75} />
        </Box>
        <Text
          fontSize="13.5px"
          fontWeight={isActive ? '600' : '500'}
          lineHeight="1.3"
        >
          {label}
        </Text>
      </Flex>
    </Link>
  )
}

function NavGroup({ label, items }) {
  return (
    <Box>
      <Text
        fontSize="11px"
        fontWeight="600"
        color="gray.400"
        textTransform="uppercase"
        letterSpacing="0.07em"
        px="10px"
        mb="3px"
      >
        {label}
      </Text>
      <VStack gap="1px" align="stretch">
        {items.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </VStack>
    </Box>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Flex
      direction="column"
      h="full"
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.100"
      userSelect="none"
    >
      {/* ── Header ── */}
      <Flex align="center" justify="space-between" px="16px" pt="16px" pb="14px">
        <Flex align="center" gap="10px">
          <Box
            w="28px"
            h="28px"
            bg="orange.500"
            borderRadius="7px"
            flexShrink={0}
          />
          <Text
            fontWeight="700"
            fontSize="14.5px"
            color="gray.900"
            letterSpacing="-0.01em"
          >
            ERP Future
          </Text>
        </Flex>
        <Box
          as={Link}
          to="/admin"
          color="gray.300"
          _hover={{ color: 'gray.500' }}
          display="flex"
          alignItems="center"
          style={{ textDecoration: 'none' }}
        >
          <Settings size={15} strokeWidth={1.75} />
        </Box>
      </Flex>

      {/* ── + New Project ── */}
      <Box px="12px" mb="18px">
        <Button
          width="full"
          size="sm"
          colorPalette="orange"
          variant="solid"
          borderRadius="md"
          fontWeight="600"
          fontSize="13px"
          gap="6px"
        >
          <Plus size={13} strokeWidth={2.5} />
          New Project
        </Button>
      </Box>

      {/* ── Scrollable nav ── */}
      <Box flex="1" overflowY="auto" px="12px" pb="8px">
        <VStack gap="22px" align="stretch">
          {NAV_GROUPS.map((group) => (
            <NavGroup key={group.label} {...group} />
          ))}
        </VStack>
      </Box>

      {/* ── User controls ── */}
      <Box
        borderTopWidth="1px"
        borderColor="gray.100"
        px="12px"
        py="10px"
      >
        <Menu.Root positioning={{ placement: 'top-start', offset: [0, 6] }}>
          <Menu.Trigger asChild>
            <Box
              as="button"
              type="button"
              w="full"
              display="flex"
              alignItems="center"
              gap="10px"
              px="8px"
              py="7px"
              borderRadius="md"
              cursor="pointer"
              border="none"
              bg="transparent"
              _hover={{ bg: 'gray.50' }}
              transition="background 0.12s"
              textAlign="left"
              outline="none"
            >
              {/* Avatar */}
              <Flex
                w="30px"
                h="30px"
                bg="orange.50"
                color="orange.500"
                borderRadius="full"
                flexShrink={0}
                align="center"
                justify="center"
                fontSize="11px"
                fontWeight="700"
                border="1px solid"
                borderColor="orange.100"
              >
                JD
              </Flex>

              {/* Name + role */}
              <Box flex="1" minW={0} overflow="hidden">
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="gray.800"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  John Doe
                </Text>
                <Text
                  fontSize="11px"
                  color="gray.400"
                  lineHeight="1.3"
                >
                  Administrator
                </Text>
              </Box>

              {/* Chevron */}
              <Box color="gray.400" display="flex" alignItems="center" flexShrink={0}>
                <ChevronUp size={13} strokeWidth={2} />
              </Box>
            </Box>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="176px">
                <Menu.Item value="profile">
                  <User size={13} />
                  My Profile
                </Menu.Item>
                <Menu.Item value="settings">
                  <Settings size={13} />
                  Settings
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  value="logout"
                  color="fg.error"
                  _hover={{ bg: 'bg.error', color: 'fg.error' }}
                  onClick={() => navigate('/login')}
                >
                  <LogOut size={13} />
                  Log Out
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Flex>
  )
}
