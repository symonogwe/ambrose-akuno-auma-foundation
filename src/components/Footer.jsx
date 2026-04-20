import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  Link,
  Flex,
  Input,
  Button,
  Separator,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { MdFavorite, MdChevronRight, MdKeyboardArrowUp } from 'react-icons/md';
import { toaster } from './ui/toaster';

const quickLinks = ['Home', 'About Us', 'Our Programs', 'Impact Reports', 'Volunteer'];
const programs = ['Youth Mentorship', 'Clean Water', 'Education Access', 'Healthcare'];

const socialIcons = [
  { Icon: FaFacebook, label: 'Facebook' },
  { Icon: FaTwitter, label: 'Twitter' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaLinkedin, label: 'LinkedIn' },
];

const colVariant = (index) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.15, ease: 'easeOut' },
  },
});

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    toaster.create({
      type: 'success',
      title: 'Successfully subscribed! 🎉',
      duration: 4000,
    });
    setNewsletterEmail('');
  };

  return (
    <Box
      as="footer"
      bg="#0A1628"
      color="white"
      borderTop="4px solid #F59E0B"
      py={16}
      px={8}
    >
      <Container maxW="7xl" mx="auto">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10}>
          {/* Column 1 — Brand */}
          <Motion.div {...colVariant(0)}>
            {/* Logo row */}
            <Flex align="center" gap={2} mb={4}>
              <Box as={MdFavorite} color="#F59E0B" fontSize="24px" aria-hidden="true" />
              <Text fontWeight="bold" fontSize="xl" color="white" lineHeight="1">
                AAAF
              </Text>
              <Text fontWeight="300" color="gray.400" lineHeight="1">
                Foundation
              </Text>
            </Flex>

            <Text color="gray.400" fontSize="sm" lineHeight="tall">
              Empowering communities through sustainable development and education since
              2010.
            </Text>

            {/* Social icons — Tooltip (v3 compound API) + Framer Motion hover */}
            <Flex mt={6} wrap="wrap">
              {socialIcons.map(({ Icon, label }) => (
                <Tooltip.Root key={label} openDelay={200} closeDelay={100}>
                  <Tooltip.Trigger asChild>
                    <Box
                      as="a"
                      href="#"
                      aria-label={label}
                      mr={4}
                      display="inline-flex"
                      color="gray.400"
                      _hover={{ color: '#F59E0B' }}
                      style={{ transition: 'color 0.2s ease' }}
                    >
                      <Box as={Icon} fontSize="22px" aria-hidden="true" />
                    </Box>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner>
                    <Tooltip.Content>{label}</Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Root>
              ))}
            </Flex>
          </Motion.div>

          {/* Column 2 — Quick Links */}
          <Motion.div {...colVariant(1)}>
            <Heading as="h4" color="white" fontWeight="bold" fontSize="md" mb={4}>
              Quick Links
            </Heading>
            {quickLinks.map((item) => (
              <Motion.div
                key={item}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'block' }}
              >
                <Link
                  href="#"
                  color="gray.400"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  mb={2}
                  cursor="pointer"
                  _hover={{ color: 'white', textDecoration: 'none' }}
                >
                  <Box as={MdChevronRight} fontSize="16px" mr={1} aria-hidden="true" />
                  {item}
                </Link>
              </Motion.div>
            ))}
          </Motion.div>

          {/* Column 3 — Programs */}
          <Motion.div {...colVariant(2)}>
            <Heading as="h4" color="white" fontWeight="bold" fontSize="md" mb={4}>
              Programs
            </Heading>
            {programs.map((item) => (
              <Motion.div
                key={item}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'block' }}
              >
                <Link
                  href="#"
                  color="gray.400"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  mb={2}
                  cursor="pointer"
                  _hover={{ color: 'white', textDecoration: 'none' }}
                >
                  <Box as={MdChevronRight} fontSize="16px" mr={1} aria-hidden="true" />
                  {item}
                </Link>
              </Motion.div>
            ))}
          </Motion.div>

          {/* Column 4 — Newsletter */}
          <Motion.div {...colVariant(3)}>
            <Heading as="h4" color="white" fontWeight="bold" fontSize="md" mb={4}>
              Stay Updated
            </Heading>
            <Text color="gray.400" fontSize="sm" mb={4}>
              Subscribe for updates on our latest projects.
            </Text>

            <Box as="form" onSubmit={handleNewsletter}>
              <Flex
                gap={0}
                borderRadius="full"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.700"
              >
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email..."
                  required
                  bg="gray.800"
                  border="none"
                  color="white"
                  borderRadius="0"
                  _placeholder={{ color: 'gray.500' }}
                  _focus={{ boxShadow: 'none', outline: 'none' }}
                  flex="1"
                  minW="0"
                />
                <Button
                  type="submit"
                  bg="#2563EB"
                  color="white"
                  px={6}
                  borderRadius="0"
                  border="none"
                  _hover={{ bg: '#F59E0B', color: 'gray.900' }}
                  flexShrink={0}
                >
                  Join
                </Button>
              </Flex>
            </Box>
          </Motion.div>
        </SimpleGrid>

        {/* Bottom bar */}
        <Separator borderColor="gray.700" my={8} />
        <Flex
          justify="space-between"
          align="center"
          flexDir={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Text color="gray.500" fontSize="xs">
            &copy; 2025 Ambrose Akuno Auma Foundation. All rights reserved.
          </Text>
          <Flex align="center" gap={2}>
            <Flex>
              <Link
                href="#"
                color="gray.500"
                fontSize="xs"
                mx={2}
                _hover={{ color: 'white' }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="gray.500"
                fontSize="xs"
                mx={2}
                _hover={{ color: 'white' }}
              >
                Terms of Service
              </Link>
            </Flex>

            {/* Back to Top button */}
            <IconButton
              aria-label="Back to top"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Box as={MdKeyboardArrowUp} fontSize="20px" aria-hidden="true" />
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
