import { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Button, HStack, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight } from 'react-icons/fi';
import { MdExpandMore } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';
import { scrollToSection } from '../utils/smoothScroll';

const MotionBox = motion(Box);

// ── Animation variant helpers ────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

const popIn = (delay = 0) => ({
  initial:    { opacity: 0, scale: 0.82 },
  animate:    { opacity: 1, scale: 1    },
  transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] },
});

// ── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // All color mode values resolved at top level — no conditional hook calls
  const heroBg           = useColorModeValue('#FFFFFF', '#0A1628');
  const headingColor     = useColorModeValue('#0A1628', '#F0F4FF');
  const subTextColor     = useColorModeValue('gray.600', 'gray.300');
  const cardBg           = useColorModeValue('white', 'white');
  const badgeBg          = useColorModeValue('white', 'gray.800');
  const badgeBorderColor = useColorModeValue('gray.200', 'gray.700');
  const secondaryColor   = useColorModeValue('#0A1628', '#F7F8FA');

  return (
    <Box
      id="hero"
      minH="100vh"
      bg={heroBg}
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      pt={{ base: '80px', lg: '0' }}
    >
      <Flex
        maxW="1280px"
        mx="auto"
        px={{ base: 6, md: 12, lg: 16 }}
        w="full"
        align="center"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 16, lg: 4 }}
        py={{ base: 16, lg: 0 }}
        minH={{ lg: '100vh' }}
      >

        {/* ── Left column — text content (60%) ────────────────────── */}
        <Box flex="6" pr={{ lg: 8 }} maxW={{ lg: '620px' }}>

          {/* Label tag */}
          <MotionBox {...fadeIn(0.1)} mb={6}>
            <HStack display="inline-flex" gap={2} align="center">
              <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" />
              <Text
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.18em"
                color="#F59E0B"
                textTransform="uppercase"
              >
                Non-Profit Organization
              </Text>
            </HStack>
          </MotionBox>

          {/* Heading line 1 */}
          <MotionBox {...fadeUp(0.3)}>
            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="800"
              color={headingColor}
              lineHeight="1.15"
              letterSpacing="-0.02em"
            >
              Empowering Communities,
            </Heading>
          </MotionBox>

          {/* Heading line 2 — typewriter cycles through mission phrases */}
          <MotionBox {...fadeUp(0.5)} mb={7}>
            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="800"
              color="#2563EB"
              lineHeight="1.15"
              letterSpacing="-0.02em"
              minH={{ base: '2.5em', md: '1.4em' }}
            >
              <TypeAnimation
                sequence={[
                  'Building Futures',                       2800,
                  'Transforming Lives, One Step at a Time', 2800,
                  'Education Access for Every Child',       2800,
                  'Clean Water. Brighter Futures.',         2800,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </Heading>
          </MotionBox>

          {/* Subtext */}
          <MotionBox {...fadeIn(0.7)} mb={9}>
            <Text
              fontSize="lg"
              color={subTextColor}
              lineHeight="1.8"
              maxW="500px"
            >
              The Ambrose Akuno Auma Foundation is dedicated to sustainable
              development, education access, and creating lasting positive change
              in underserved regions.
            </Text>
          </MotionBox>

          {/* CTA buttons */}
          <MotionBox {...fadeIn(0.9)} mb={8}>
            <HStack gap={4} flexWrap="wrap">
              <Button
                size="lg"
                py={4}
                px={8}
                borderRadius="6px"
                fontWeight="700"
                bg="#2563EB"
                color="white"
                _hover={{ bg: '#1d4ed8', transform: 'translateY(-2px)' }}
                style={{ transition: 'all 0.2s ease' }}
                onClick={() => scrollToSection('about')}
              >
                Learn More
                <MotionBox as="span" display="inline-flex" alignItems="center" ml={2} whileHover={{ x: 4 }}>
                  <Box as={FiArrowRight} aria-hidden="true" />
                </MotionBox>
              </Button>

              {/* TODO: Can link to dedicated volunteer form page in future */}
              <Button
                size="lg"
                py={4}
                px={8}
                borderRadius="6px"
                fontWeight="700"
                variant="outline"
                border="2px solid"
                borderColor={secondaryColor}
                color={secondaryColor}
                bg="transparent"
                _hover={{ bg: secondaryColor, color: 'white', transform: 'translateY(-2px)' }}
                style={{ transition: 'all 0.2s ease' }}
                onClick={() => scrollToSection('contact')}
              >
                Volunteer
              </Button>
            </HStack>
          </MotionBox>

          {/* Stat badge — clicking scrolls to the Impact Stats section */}
          <MotionBox
            {...popIn(1.1)}
            display="inline-block"
            onClick={() => scrollToSection('impact')}
            cursor="pointer"
            title="View our impact stats"
          >
            <HStack
              display="inline-flex"
              align="center"
              gap={3}
              bg={badgeBg}
              borderRadius="full"
              px={4}
              py={2}
              border="1px solid"
              borderColor={badgeBorderColor}
              boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            >
              <Box color="#F59E0B" fontSize="md" display="flex" alignItems="center" aria-hidden="true">
                ♥
              </Box>
              <Text fontSize="sm" fontWeight="600" color="#1D4ED8">
                13,000+ Lives Impacted
              </Text>
            </HStack>
          </MotionBox>
        </Box>

        {/* ── Right column — illustrated card (40%) ───────────────── */}
        <Box
          flex="4"
          display="flex"
          justifyContent={{ base: 'center', lg: 'flex-end' }}
          alignItems="center"
        >
          {/* Slide in from right */}
          <MotionBox
            initial={{ opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Gentle infinite floating animation */}
            <MotionBox
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Clean white card */}
              <Box
                w={{ base: '270px', sm: '320px', md: '360px', lg: '380px' }}
                h={{ base: '320px', sm: '380px', md: '430px', lg: '460px' }}
                borderRadius="16px"
                bg={cardBg}
                boxShadow="0 20px 60px rgba(0,0,0,0.12)"
                border="1px solid"
                borderColor="gray.100"
                position="relative"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* ── Community illustration — blue palette on white ── */}
                <Box position="relative" w="220px" h="200px" mb={2}>
                  {/* Central figure (tallest) */}
                  <Stack
                    align="center"
                    gap={0}
                    position="absolute"
                    bottom={0}
                    left="50%"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <Box w="52px" h="52px" borderRadius="full" bg="#2563EB" shadow="0 4px 12px rgba(37,99,235,0.3)" />
                    <Box w="72px" h="90px" borderRadius="24px 24px 16px 16px" bg="#3b82f6" mt="-4px" />
                  </Stack>

                  {/* Left figure */}
                  <Stack align="center" gap={0} position="absolute" bottom={0} left="8%">
                    <Box w="42px" h="42px" borderRadius="full" bg="#1d4ed8" shadow="0 4px 10px rgba(37,99,235,0.25)" />
                    <Box w="58px" h="72px" borderRadius="20px 20px 12px 12px" bg="#2563EB" opacity={0.85} mt="-4px" />
                  </Stack>

                  {/* Right figure */}
                  <Stack align="center" gap={0} position="absolute" bottom={0} right="8%">
                    <Box w="44px" h="44px" borderRadius="full" bg="#1d4ed8" shadow="0 4px 10px rgba(37,99,235,0.25)" />
                    <Box w="60px" h="76px" borderRadius="20px 20px 12px 12px" bg="#2563EB" opacity={0.85} mt="-4px" />
                  </Stack>

                  {/* Small figure left-back */}
                  <Stack align="center" gap={0} position="absolute" bottom="30px" left="22%">
                    <Box w="32px" h="32px" borderRadius="full" bg="#93c5fd" />
                    <Box w="44px" h="54px" borderRadius="14px 14px 10px 10px" bg="#bfdbfe" mt="-3px" />
                  </Stack>

                  {/* Small figure right-back */}
                  <Stack align="center" gap={0} position="absolute" bottom="30px" right="22%">
                    <Box w="34px" h="34px" borderRadius="full" bg="#93c5fd" />
                    <Box w="46px" h="56px" borderRadius="14px 14px 10px 10px" bg="#bfdbfe" mt="-3px" />
                  </Stack>

                  {/* Ground line */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left="5%"
                    right="5%"
                    h="3px"
                    bg="#dbeafe"
                    borderRadius="full"
                  />
                </Box>

                {/* Card label */}
                <Box textAlign="center" px={8} mt={4}>
                  <Text fontWeight="800" color="#0A1628" fontSize="xl" lineHeight="1.2" letterSpacing="-0.01em">
                    Community First
                  </Text>
                  <Text color="gray.500" fontSize="sm" mt={1} fontWeight="400">
                    Building futures together
                  </Text>
                </Box>

                {/* Small badge inside card */}
                <Box
                  position="absolute"
                  top="18px"
                  right="18px"
                  bg="gray.50"
                  borderRadius="xl"
                  px={3}
                  py={2}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="xs" fontWeight="700" color="#0A1628">
                    🌍 UK Registered
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </MotionBox>
        </Box>
      </Flex>

      {/* ── Bouncing scroll indicator ──────────────────────────────── */}
      <MotionBox
        position="absolute"
        bottom="32px"
        left="50%"
        style={{
          transform: 'translateX(-50%)',
          opacity: showScrollIndicator ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        onClick={() => scrollToSection('about')}
        cursor="pointer"
        aria-label="Scroll to learn more"
      >
        <Box as={MdExpandMore} fontSize="32px" color="#2563EB" display="block" aria-hidden="true" />
      </MotionBox>
    </Box>
  );
};

export default Hero;
