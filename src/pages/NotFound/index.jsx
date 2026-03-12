import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Flex minH="full" align="center" justify="center">
      <VStack gap={3} textAlign="center">
        <Heading size="2xl" color="gray.700">
          404
        </Heading>
        <Heading size="md" color="gray.800">
          Page not found
        </Heading>
        <Text color="gray.500">
          The page you are looking for does not exist.
        </Text>
        <Button asChild mt={2} colorPalette="brand">
          <RouterLink to="/">Go to Dashboard</RouterLink>
        </Button>
      </VStack>
    </Flex>
  )
}
