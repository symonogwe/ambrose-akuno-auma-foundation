import { useState } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdVerified, MdVolunteerActivism, MdFavorite } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';

const MotionBox = motion(Box);

// ── Flip Card ────────────────────────────────────────────────────────────────
// 3D CSS flip using Framer Motion rotateY + preserve-3d / backface-visibility

const FlipCard = ({ icon, name, tagline, description }) => {
  const [flipped, setFlipped] = useState(false);
  // Uppercase alias required for JSX component rendering
  const Icon = icon;

  return (
    <Box
      w="200px"
      h="220px"
      cursor="pointer"
      flexShrink={0}
      // CSS perspective must live on the container, not the rotating element
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)} // touch-friendly toggle
    >
      {/* Rotating inner element */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          borderRadius: '16px',
        }}
      >
        {/* ── Front face ───────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: '#2563EB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          }}
        >
          {/* Subtle decorative ring */}
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{ fontSize: '2.6rem', marginBottom: '12px', color: 'rgba(255,255,255,0.9)' }}>
            <Icon />
          </div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>
            {name}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.72)', textAlign: 'center', lineHeight: 1.5 }}>
            {tagline}
          </p>
        </div>

        {/* ── Back face ────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#F59E0B',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          }}
        >
          {/* Decorative elements */}
          <div style={{
            position: 'absolute', bottom: '10px', right: '10px',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
          }} />
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
          }} />

          <p style={{ margin: 0, fontWeight: 800, fontSize: '13px', color: '#0A1628', textAlign: 'center', marginBottom: '10px', letterSpacing: '0.01em' }}>
            {name}
          </p>
          <p style={{ margin: 0, fontSize: '11.5px', color: '#1e3a5f', textAlign: 'center', lineHeight: 1.65 }}>
            {description}
          </p>
        </div>
      </motion.div>
    </Box>
  );
};

// ── Card data ─────────────────────────────────────────────────────────────────

const CARDS = [
  {
    icon: MdVerified,
    name: 'Integrity',
    tagline: 'Honest in everything we do',
    description:
      'We uphold the highest standards of honesty and transparency in our operations and financial reporting.',
  },
  {
    icon: MdVolunteerActivism,
    name: 'Service',
    tagline: 'Communities come first',
    description:
      'Dedicated to serving our communities with compassion, putting the needs of the vulnerable first.',
  },
  {
    icon: MdFavorite,
    name: 'Compassion',
    tagline: 'Empathy drives our action',
    description:
      'Every program we run is designed with deep empathy for the people we serve and the challenges they face.',
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

const Mission = () => {
  const sectionBg  = useColorModeValue('#F8FAFF', '#0d1d35');
  const textColor  = useColorModeValue('#0A1628', '#F0F4FF');
  const subColor   = useColorModeValue('#4B5563', '#94A3B8');
  const dotGrid    = useColorModeValue(
    'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
    'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)'
  );

  return (
    <Box
      id="mission"
      bg={sectionBg}
      backgroundImage={dotGrid}
      backgroundSize="24px 24px"
      py={{ base: 20, md: 28 }}
      px={{ base: 6, md: 12, lg: 16 }}
    >
      <Flex
        maxW="1280px"
        mx="auto"
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        gap={{ base: 16, lg: 20 }}
      >

        {/* ── Left: text content ─────────────────────────────────────── */}
        <MotionBox
          flex="5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {/* Vertical gold accent line */}
          <Box w="4px" h="48px" bg="#F59E0B" borderRadius="full" mb={3} />

          {/* Label */}
          <Box mb={5} display="flex" alignItems="center" gap={3}>
            <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" flexShrink={0} />
            <Text
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.18em"
              color="#F59E0B"
              textTransform="uppercase"
            >
              Our Purpose
            </Text>
          </Box>

          {/* Heading */}
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="700"
            color={textColor}
            lineHeight="1.2"
            letterSpacing="-0.02em"
            mb={6}
          >
            Our Mission & Vision
          </Heading>

          {/* Body */}
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={subColor}
            lineHeight="1.85"
            maxW="480px"
          >
            We believe in a world where every individual has the opportunity to
            thrive. Our core values guide every initiative we undertake.
          </Text>
        </MotionBox>

        {/* ── Right: flip cards ──────────────────────────────────────── */}
        <MotionBox
          flex="7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
          display="flex"
          justifyContent={{ base: 'center', lg: 'flex-end' }}
        >
          <Flex gap={5} flexWrap="wrap" justify={{ base: 'center', lg: 'flex-end' }}>
            {CARDS.map((card, i) => (
              <MotionBox
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
              >
                <FlipCard {...card} />
              </MotionBox>
            ))}
          </Flex>
        </MotionBox>

      </Flex>
    </Box>
  );
};

export default Mission;
