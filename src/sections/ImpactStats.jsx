import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdLocationOn, MdFavorite, MdPeople, MdVerified } from 'react-icons/md';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const MotionBox = motion(Box);

// ── Stat data ─────────────────────────────────────────────────────────────────

const STATS = [
  { target: 50,  suffix: '+',  label: 'Communities Served', icon: MdLocationOn },
  { target: 10,  suffix: 'k+', label: 'Lives Impacted',     icon: MdFavorite   },
  { target: 150, suffix: '+',  label: 'Volunteers',          icon: MdPeople     },
  { target: 100, suffix: '%',  label: 'Transparency',        icon: MdVerified   },
];

// ── Floating dot definitions (fixed positions, no randomness) ─────────────────
const DOTS = [
  { top: '10%', left: '5%',  size: '8px',  duration: 3.5 },
  { top: '25%', left: '88%', size: '6px',  duration: 4.2 },
  { top: '55%', left: '15%', size: '10px', duration: 5.0 },
  { top: '70%', left: '75%', size: '7px',  duration: 3.8 },
  { top: '85%', left: '45%', size: '9px',  duration: 6.0 },
  { top: '40%', left: '60%', size: '6px',  duration: 4.7 },
];

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;

  return (
    <MotionBox
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      {/* Icon — subtle white, purely decorative */}
      <Box color="rgba(255,255,255,0.4)" fontSize="24px" mb={3} lineHeight={1} aria-hidden="true">
        <Icon />
      </Box>

      {/* Number + suffix — one bold white unit, no color split */}
      <Text
        fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
        fontWeight="900"
        color="white"
        lineHeight={1}
        letterSpacing="-0.03em"
        fontFamily="heading"
        mb={2}
      >
        <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2.5} />
      </Text>

      {/* Label */}
      <Text
        fontSize="sm"
        fontWeight="400"
        color="rgba(255,255,255,0.5)"
        letterSpacing="0.08em"
        textTransform="uppercase"
        mt={2}
      >
        {stat.label}
      </Text>
    </MotionBox>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const ImpactStats = () => (
  <Box
    id="impact"
    bg="#0A1628"
    py={{ base: 16, md: 20 }}
    px={{ base: 6, md: 12, lg: 16 }}
    position="relative"
    overflow="hidden"
  >
    {/* Radial gradient — adds subtle depth at the top */}
    <Box
      position="absolute"
      inset={0}
      background="radial-gradient(ellipse 100% 60% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)"
      pointerEvents="none"
    />

    {/* Floating dots — extremely subtle */}
    {DOTS.map((dot, i) => (
      <MotionBox
        key={i}
        position="absolute"
        top={dot.top}
        left={dot.left}
        w={dot.size}
        h={dot.size}
        borderRadius="full"
        bg="rgba(255,255,255,0.03)"
        pointerEvents="none"
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: dot.duration, ease: 'easeInOut' }}
      />
    ))}

    <Box maxW="1280px" mx="auto" position="relative" zIndex={1}>

      {/* ── Section label ──────────────────────────────────────────── */}
      <MotionBox
        textAlign="center"
        mb={{ base: 12, md: 16 }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <Text
          fontSize="11px"
          fontWeight="700"
          letterSpacing="0.18em"
          color="rgba(255,255,255,0.4)"
          textTransform="uppercase"
          mb={3}
        >
          Our Impact
        </Text>
        {/* Subtle gold rule */}
        <Box w="32px" h="2px" bg="rgba(245,158,11,0.5)" borderRadius="full" mx="auto" />
      </MotionBox>

      {/* ── Stats row ──────────────────────────────────────────────── */}
      {/*   Desktop: 4 across with thin dividers between each stat.   */}
      {/*   Mobile:  stacked column with generous gap.                */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-around"
        align="center"
        gap={{ base: 10, md: 0 }}
      >
        {(() => {
          const items = [];
          STATS.forEach((stat, i) => {
            items.push(
              <StatCard key={stat.label} stat={stat} index={i} />
            );
            if (i < STATS.length - 1) {
              items.push(
                <Box
                  key={`divider-${i}`}
                  display={{ base: 'none', md: 'block' }}
                  w="1px"
                  h="60px"
                  bg="rgba(255,255,255,0.1)"
                  flexShrink={0}
                  alignSelf="center"
                />
              );
            }
          });
          return items;
        })()}
      </Flex>

    </Box>
  </Box>
);

export default ImpactStats;
