import { Box, Flex, Text } from '@chakra-ui/react'
import { useMatches, useNavigate } from 'react-router-dom'
import { Undo2, ChevronRight } from 'lucide-react'

/**
 * TopBar reads breadcrumbs directly from the matched route tree via
 * useMatches(). Every route that should appear as a crumb must carry:
 *
 *   handle: { crumb: 'Label' }
 *
 * No label mapping lives here — add/rename routes in src/router/index.jsx
 * and the breadcrumb updates automatically.
 */
export default function TopBar() {
  const navigate = useNavigate()
  const matches = useMatches()

  const breadcrumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => ({ label: match.handle.crumb, path: match.pathname }))

  return (
    <Box
      as="header"
      w="full"
      h="full"
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.100"
      px="28px"
      display="flex"
      alignItems="center"
    >
      <Flex align="center" gap="6px">
        {/* Back arrow */}
        <Box
          as="button"
          type="button"
          onClick={() => navigate(-1)}
          display="flex"
          alignItems="center"
          color="gray.400"
          _hover={{ color: 'gray.700' }}
          transition="color 0.12s"
          cursor="pointer"
          border="none"
          bg="transparent"
          p="0"
          mr="6px"
        >
          <Undo2 size={14} strokeWidth={2} />
        </Box>

        {/* Crumb trail — sourced entirely from route handles */}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <Flex key={crumb.path} align="center" gap="6px">
              {index > 0 && (
                <Box color="gray.300" display="flex" alignItems="center">
                  <ChevronRight size={12} strokeWidth={2.5} />
                </Box>
              )}
              <Text
                fontSize="13.5px"
                fontWeight={isLast ? '600' : '400'}
                color={isLast ? 'gray.800' : 'gray.400'}
                cursor={isLast ? 'default' : 'pointer'}
                _hover={isLast ? {} : { color: 'gray.600' }}
                transition="color 0.12s"
                onClick={isLast ? undefined : () => navigate(crumb.path)}
              >
                {crumb.label}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
