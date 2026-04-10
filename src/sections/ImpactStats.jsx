import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdLocationOn, MdFavorite, MdPeople, MdVerified } from 'react-icons/md';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { useColorModeValue } from '../components/ui/ColorModeProvider';

const MotionBox = motion(Box);

// ── Stat data ─────────────────────────────────────────────────────────────────
// target = display number (e.g. 10 → renders as "10k+" not "10000k+")

const STATS = [
  { target: 50,  suffix: '+',  label: 'Communities Served', icon: MdLocationOn },
  { target: 10,  suffix: 'k+', label: 'Lives Impacted',     icon: MdFavorite   },
  { target: 150, suffix: '+',  label: 'Volunteers',          icon: MdPeople     },
  { target: 100, suffix: '%',  label: 'Transparency',        icon: MdVerified   },
];

// ── Floating dot definitions (fixed positions + durations, no randomness) ─────
const DOTS = [
  { top: '10%', left: '5%',  size: '8px',  duration: 3.5 },
  { top: '25%', left: '88%', size: '6px',  duration: 4.2 },
  { top: '55%', left: '15%', size: '10px', duration: 5.0 },
  { top: '70%', left: '75%', size: '7px',  duration: 3.8 },
  { top: '85%', left: '45%', size: '9px',  duration: 6.0 },
  { top: '40%', left: '60%', size: '6px',  duration: 4.7 },
];

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ stat, index, isLast }) => {
  const Icon = stat.icon;
  // Label is white-ish on blue (light) and muted on navy (dark)
  const labelColor   = useColorModeValue('rgba(255,255,255,0.85)', 'gray.400');
  // Dividers are more visible on the brighter blue background
  const dividerColor = useColorModeValue('rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)');

  return (
    <MotionBox
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      borderTop="2px solid rgba(245,158,11,0.35)"
      // Vertical divider on desktop, horizontal on mobile — skip on last card
      borderRight={!isLast ? { base: 'none', md: `1px solid ${dividerColor}` } : 'none'}
      borderBottom={{ base: !isLast ? `1px solid ${dividerColor}` : 'none', md: 'none' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
    >
      {/* Icon — gold in both modes, decorative (stat value is the meaningful content) */}
      <Box color="#F59E0B" fontSize="32px" mb={4} lineHeight={1} aria-hidden="true">
        <Icon />
      </Box>

      {/* Animated number — white in both modes, suffix in gold via AnimatedCounter */}
      <Text
        fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
        fontWeight="800"
        color="white"
        lineHeight={1}
        letterSpacing="-0.02em"
        mb={3}
      >
        <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2.5} />
      </Text>

      {/* Label */}
      <Text fontSize="sm" fontWeight="500" color={labelColor} letterSpacing="0.04em">
        {stat.label}
      </Text>
    </MotionBox>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const ImpactStats = () => {
  // Light: bold brand blue — energetic and on-brand
  // Dark: deep navy — keeps it grounded at night
  const heroBg = useColorModeValue(
    'radial-gradient(ellipse at center, #3b82f6 0%, #2563EB 70%)',
    'radial-gradient(ellipse at center, #1a2f50 0%, #0A1628 70%)'
  );
  // Glassmorphism card: softer on blue, subtler on navy
  const cardBg = useColorModeValue('rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)');

  return (
    <Box
      id="impact"
      background={heroBg}
      py={{ base: 16, md: 20 }}
      px={{ base: 6, md: 12, lg: 16 }}
      position="relative"
      overflow="hidden"
    >
      {/* ── Floating gold dots ─────────────────────────────────────── */}
      {DOTS.map((dot, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={dot.top}
          left={dot.left}
          w={dot.size}
          h={dot.size}
          borderRadius="full"
          bg="rgba(245,158,11,0.15)"
          pointerEvents="none"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: dot.duration, ease: 'easeInOut' }}
        />
      ))}

      <Box maxW="1280px" mx="auto" position="relative" zIndex={1}>

        {/* ── Section label — gold on both backgrounds ───────────────── */}
        <MotionBox
          textAlign="center"
          mb={{ base: 10, md: 14 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={3} mb={3}>
            <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" />
            <Text
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.18em"
              color="#F59E0B"
              textTransform="uppercase"
            >
              Our Impact
            </Text>
          </Box>
          {/* Gold divider line */}
          <Box w="48px" h="3px" bg="#F59E0B" borderRadius="full" mx="auto" mt={2} mb={8} />
        </MotionBox>

        {/* ── Stat cards row ─────────────────────────────────────────── */}
        {/* Desktop: 4 across with dividers │ Mobile: stacked */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          flexWrap={{ base: 'nowrap', sm: 'wrap', md: 'nowrap' }}
          align="stretch"
          borderRadius="2xl"
          overflow="hidden"
          // Glassmorphism: frosted layer over the gradient background
          bg={cardBg}
          border="1px solid rgba(255,255,255,0.2)"
          style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isLast={i === STATS.length - 1}
            />
          ))}
        </Flex>

      </Box>
    </Box>
  );
};

export default ImpactStats;
