import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/', { replace: true })
  }

  return (
    <Flex
      minH="100dvh"
      bg="gray.50"
      align="center"
      justify="center"
      px={4}
      py={{ base: 8, md: 12 }}
    >
      <Box w="full" maxW="440px">
        <Box textAlign="center" mb={6}>
          <HStack justify="center" gap={3} mb={4}>
            <Flex
              w="40px"
              h="40px"
              borderRadius="xl"
              bg="brand.500"
              color="white"
              align="center"
              justify="center"
              boxShadow="0 14px 30px rgba(19, 185, 167, 0.22)"
            >
              <ShieldCheck size={18} strokeWidth={2.4} />
            </Flex>
            <Text fontSize="lg" fontWeight="700" color="gray.900" letterSpacing="-0.01em">
              ERP Future
            </Text>
          </HStack>

          <Heading fontSize={{ base: '2xl', md: '3xl' }} color="gray.900" mb={3}>
            Sign in
          </Heading>
          <Text color="gray.500" lineHeight="1.7">
            Use your work email and password to open your dashboard.
          </Text>
        </Box>

        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="2xl"
          px={{ base: 5, md: 6 }}
          py={{ base: 5, md: 6 }}
          boxShadow="0 18px 50px rgba(15, 23, 42, 0.06)"
        >
          <Box as="form" onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Box>
                <Text
                  as="label"
                  htmlFor="email"
                  display="block"
                  mb={2}
                  fontSize="sm"
                  fontWeight="600"
                  color="gray.700"
                >
                  Email
                </Text>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left="14px"
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    pointerEvents="none"
                  >
                    <Mail size={16} strokeWidth={2} />
                  </Box>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    size="lg"
                    pl="42px"
                    bg="gray.50"
                    borderColor="gray.200"
                    autoComplete="email"
                  />
                </Box>
              </Box>

              <Box>
                <HStack justify="space-between" mb={2} align="center">
                  <Text
                    as="label"
                    htmlFor="password"
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                  >
                    Password
                  </Text>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    px={2}
                    minW="auto"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </HStack>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left="14px"
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    pointerEvents="none"
                  >
                    <LockKeyhole size={16} strokeWidth={2} />
                  </Box>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    pl="42px"
                    bg="gray.50"
                    borderColor="gray.200"
                    autoComplete="current-password"
                  />
                </Box>
              </Box>

              <Box as="label" display="flex" alignItems="center" gap={3} cursor="pointer">
                <Box
                  as="input"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  accentColor="#13b9a7"
                  w="16px"
                  h="16px"
                  flexShrink={0}
                />
                <Text fontSize="sm" color="gray.600">
                  Keep me signed in
                </Text>
              </Box>

              <Button
                type="submit"
                size="lg"
                colorPalette="brand"
                borderRadius="xl"
                fontWeight="700"
                gap={2}
              >
                Sign in
                <ArrowRight size={16} strokeWidth={2.3} />
              </Button>
            </Stack>
          </Box>
        </Box>

        <Text mt={4} textAlign="center" fontSize="sm" color="gray.500" lineHeight="1.7">
          Need help? Ask your administrator for your work email and password.
        </Text>
      </Box>
    </Flex>
  )
}
