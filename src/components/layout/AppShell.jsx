import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const SIDEBAR_WIDTH = '280px'
const TOPBAR_HEIGHT = '64px'

/**
 * AppShell — root layout wrapper.
 *
 * ┌──────────┬─────────────────────────────┐
 * │          │  TopBar (64px)              │
 * │ Sidebar  ├─────────────────────────────┤
 * │ (280px)  │  Page content (scrollable)  │
 * │          │                             │
 * └──────────┴─────────────────────────────┘
 */
export default function AppShell() {
  return (
    <Flex h="100dvh" overflow="hidden">
      {/* Sidebar column — fixed width, full height, non-scrolling */}
      <Box
        w={SIDEBAR_WIDTH}
        flexShrink={0}
        h="full"
        overflowY="auto"
      >
        <Sidebar />
      </Box>

      {/* Right column — stacks TopBar above scrollable content */}
      <Flex flex="1" direction="column" overflow="hidden" minW={0}>
        {/* TopBar */}
        <Box h={TOPBAR_HEIGHT} flexShrink={0}>
          <TopBar />
        </Box>

        {/* Scrollable page content */}
        <Box flex="1" overflowY="auto" p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}
