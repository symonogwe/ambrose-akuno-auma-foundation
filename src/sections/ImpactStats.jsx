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

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ stat, index, isLast }) => {
  const Icon = stat.icon;
  // Label is white-ish on blue (light) and muted on navy (dark)
  const labelColor  = useColorModeValue('rgba(255,255,255,0.85)', 'gray.400');
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
      // Vertical divider on desktop, horizontal on mobile — skip on last card
      borderRight={!isLast ? { base: 'none', md: `1px solid ${dividerColor}` } : 'none'}
      borderBottom={{ base: !isLast ? `1px solid ${dividerColor}` : 'none', md: 'none' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
    >
      {/* Icon — gold in both modes */}
      <Box color="#F59E0B" fontSize="32px" mb={4} lineHeight={1}>
        <Icon />
      </Box>

      {/* Animated number — white in both modes, suffix in gold via AnimatedCounter */}
      <Text
        fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
        fontWeight="800"
        color="white"
        lineHeight={1}
        letterSpacing="-0.03em"
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
    >
      <Box maxW="1280px" mx="auto">

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
