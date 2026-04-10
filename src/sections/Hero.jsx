import { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Button, HStack, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight } from 'react-icons/fi';
import { MdExpandMore } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';
import { scrollToSection } from '../utils/smoothScroll';

// Animated Chakra primitives
const MotionBox = motion(Box);

// ── Animation variant helpers ────────────────────────────────────────────────

/** Fades + slides up from below */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

/** Simple fade in */
const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

/** Pop in with slight scale */
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

  // All color mode values resolved at top — no conditional hook calls
  const heroBg = useColorModeValue(
    'linear-gradient(145deg, #f0f4ff 0%, #e8effd 50%, #f5f8ff 100%)',
    'radial-gradient(ellipse 120% 80% at 50% 0%, #1a2e50 0%, #0A1628 65%)'
  );
  const gradientMesh = useColorModeValue(
    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.12) 0%, transparent 60%)',
    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.25) 0%, transparent 60%)'
  );
  const headingColor  = useColorModeValue('#0A1628', '#F0F4FF');
  const subTextColor  = useColorModeValue('gray.600', 'gray.300');
  const badgeBg       = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(10,22,40,0.8)');

  return (
    <Box
      id="hero"
      minH="100vh"
      background={heroBg}
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      // Push content below fixed navbar
      pt={{ base: '80px', lg: '0' }}
    >
      {/* Gradient mesh overlay */}
      <Box
        position="absolute"
        inset={0}
        background={gradientMesh}
        pointerEvents="none"
      />

      {/* Decorative background blobs */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="rgba(37,99,235,0.05)"
        filter="blur(80px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-15%"
        left="-10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="rgba(245,158,11,0.05)"
        filter="blur(80px)"
        pointerEvents="none"
      />

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
                borderRadius="full"
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
                borderRadius="full"
                fontWeight="700"
                variant="outline"
                border="2px solid"
                borderColor="#2563EB"
                color="#2563EB"
                bg="transparent"
                _hover={{ bg: '#2563EB', color: 'white', transform: 'translateY(-2px)' }}
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
              border="1px solid rgba(245,158,11,0.3)"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <Box
                color="#F59E0B"
                fontSize="md"
                display="flex"
                alignItems="center"
                aria-hidden="true"
              >
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
          {/* Slide in from right, with glow */}
          <MotionBox
            initial={{ opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            filter="drop-shadow(0 0 40px rgba(37,99,235,0.25))"
          >
            {/* Gentle infinite floating animation */}
            <MotionBox
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Card */}
              <Box
                w={{ base: '270px', sm: '320px', md: '360px', lg: '380px' }}
                h={{ base: '320px', sm: '380px', md: '430px', lg: '460px' }}
                borderRadius="3xl"
                background="linear-gradient(145deg, #34d399 0%, #06b6d4 40%, #818cf8 80%, #c084fc 100%)"
                shadow="0 32px 80px rgba(37,99,235,0.22)"
                position="relative"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* Decorative background rings */}
                <Box
                  position="absolute"
                  top="-50px"
                  right="-50px"
                  w="180px"
                  h="180px"
                  borderRadius="full"
                  border="2px solid rgba(255,255,255,0.2)"
                />
                <Box
                  position="absolute"
                  top="-80px"
                  right="-80px"
                  w="260px"
                  h="260px"
                  borderRadius="full"
                  border="2px solid rgba(255,255,255,0.1)"
                />
                <Box
                  position="absolute"
                  bottom="-40px"
                  left="-40px"
                  w="160px"
                  h="160px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.1)"
                  filter="blur(20px)"
                />

                {/* ── Community illustration — stacked silhouette shapes ── */}
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
                    <Box
                      w="52px"
                      h="52px"
                      borderRadius="full"
                      bg="rgba(255,255,255,0.92)"
                      shadow="0 4px 12px rgba(0,0,0,0.15)"
                    />
                    <Box
                      w="72px"
                      h="90px"
                      borderRadius="24px 24px 16px 16px"
                      bg="rgba(255,255,255,0.75)"
                      mt="-4px"
                    />
                  </Stack>

                  {/* Left figure */}
                  <Stack
                    align="center"
                    gap={0}
                    position="absolute"
                    bottom={0}
                    left="8%"
                  >
                    <Box
                      w="42px"
                      h="42px"
                      borderRadius="full"
                      bg="rgba(255,255,255,0.88)"
                      shadow="0 4px 10px rgba(0,0,0,0.12)"
                    />
                    <Box
                      w="58px"
                      h="72px"
                      borderRadius="20px 20px 12px 12px"
                      bg="rgba(255,255,255,0.65)"
                      mt="-4px"
                    />
                  </Stack>

                  {/* Right figure */}
                  <Stack
                    align="center"
                    gap={0}
                    position="absolute"
                    bottom={0}
                    right="8%"
                  >
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="full"
                      bg="rgba(255,255,255,0.88)"
                      shadow="0 4px 10px rgba(0,0,0,0.12)"
                    />
                    <Box
                      w="60px"
                      h="76px"
                      borderRadius="20px 20px 12px 12px"
                      bg="rgba(255,255,255,0.65)"
                      mt="-4px"
                    />
                  </Stack>

                  {/* Small figure left-back */}
                  <Stack
                    align="center"
                    gap={0}
                    position="absolute"
                    bottom="30px"
                    left="22%"
                  >
                    <Box w="32px" h="32px" borderRadius="full" bg="rgba(255,255,255,0.6)" />
                    <Box w="44px" h="54px" borderRadius="14px 14px 10px 10px" bg="rgba(255,255,255,0.45)" mt="-3px" />
                  </Stack>

                  {/* Small figure right-back */}
                  <Stack
                    align="center"
                    gap={0}
                    position="absolute"
                    bottom="30px"
                    right="22%"
                  >
                    <Box w="34px" h="34px" borderRadius="full" bg="rgba(255,255,255,0.6)" />
                    <Box w="46px" h="56px" borderRadius="14px 14px 10px 10px" bg="rgba(255,255,255,0.45)" mt="-3px" />
                  </Stack>

                  {/* Ground / horizon line */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left="5%"
                    right="5%"
                    h="3px"
                    bg="rgba(255,255,255,0.3)"
                    borderRadius="full"
                  />
                </Box>

                {/* Card label */}
                <Box textAlign="center" px={8} mt={4}>
                  <Text
                    fontWeight="800"
                    color="white"
                    fontSize="xl"
                    lineHeight="1.2"
                    letterSpacing="-0.01em"
                  >
                    Community First
                  </Text>
                  <Text
                    color="rgba(255,255,255,0.75)"
                    fontSize="sm"
                    mt={1}
                    fontWeight="400"
                  >
                    Building futures together
                  </Text>
                </Box>

                {/* Small floating badge inside card */}
                <Box
                  position="absolute"
                  top="18px"
                  right="18px"
                  bg="rgba(255,255,255,0.25)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  px={3}
                  py={2}
                  border="1px solid rgba(255,255,255,0.3)"
                >
                  <Text fontSize="xs" fontWeight="700" color="white">
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
        <Box
          as={MdExpandMore}
          fontSize="32px"
          color="#2563EB"
          display="block"
          aria-hidden="true"
        />
      </MotionBox>
    </Box>
  );
};

export default Hero;
