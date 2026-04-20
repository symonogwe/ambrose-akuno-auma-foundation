import { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Button, HStack } from '@chakra-ui/react';
import youthImg from '../assets/youth-mentorship.jpg';
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
                cursor={false}
              />
              <Box
                as="span"
                display="inline-block"
                w="3px"
                h="0.85em"
                bg="#2563EB"
                ml="1px"
                borderRadius="1px"
                verticalAlign="text-bottom"
                aria-hidden="true"
                style={{ animation: 'cursorBlink 1.2s ease-in-out infinite' }}
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
              {/* Full-bleed image card */}
              <Box
                w={{ base: '270px', sm: '320px', md: '360px', lg: '380px' }}
                h={{ base: '320px', sm: '380px', md: '430px', lg: '460px' }}
                borderRadius="16px"
                boxShadow="0 20px 60px rgba(0,0,0,0.12)"
                overflow="hidden"
                position="relative"
              >
                {/* Layer 1 — full bleed image */}
                <Box
                  position="absolute"
                  inset={0}
                  bgImage={`url(${youthImg})`}
                  bgSize="cover"
                  bgPosition="center"
                />

                {/* Layer 2 — gradient overlay */}
                <Box
                  position="absolute"
                  inset={0}
                  background="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)"
                />

                {/* Layer 3 — text pinned to bottom */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  p={6}
                  zIndex={2}
                >
                  <Text
                    fontWeight="800"
                    color="white"
                    fontSize="xl"
                    lineHeight="1.2"
                    letterSpacing="-0.01em"
                    mb={1}
                  >
                    Community First
                  </Text>
                  <Text color="rgba(255,255,255,0.85)" fontSize="sm" fontWeight="400">
                    Building futures together
                  </Text>
                </Box>

                {/* Layer 4 — UK Registered badge */}
                <Box
                  position="absolute"
                  top="18px"
                  right="18px"
                  zIndex={2}
                  bg="rgba(255,255,255,0.95)"
                  borderRadius="xl"
                  px={3}
                  py={2}
                  border="1px solid"
                  borderColor="gray.200"
                  backdropFilter="blur(8px)"
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
