import { useState } from 'react';
import { Box, Text, Heading, Avatar, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';

const MotionBox = motion(Box);
const MotionA   = motion.a;

// ── Team data ─────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: 'Ambrose Akuno',
    role: 'Founder',
    bio: 'Visionary leader with 15+ years in community development across East Africa and the UK.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Sarah Mwangi',
    role: 'Director',
    bio: 'Development expert specialising in sustainable programs and international partnerships.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Ochieng',
    role: 'Programs Lead',
    bio: 'Field operations specialist who has managed 30+ community projects across 5 countries.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Grace Auma',
    role: 'Outreach Coordinator',
    bio: 'Community engagement expert connecting grassroots volunteers with foundation programs.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Kimani',
    role: 'Finance Manager',
    bio: 'Certified accountant ensuring 100% financial transparency and responsible fund management.',
    linkedin: '#',
    twitter: '#',
  },
];

// ── Flip Card ─────────────────────────────────────────────────────────────────

const TeamCard = ({ member }) => {
  const [flipped, setFlipped] = useState(false);

  const cardBg          = useColorModeValue('white', '#1e293b');
  const nameColor       = useColorModeValue('#0A1628', '#F0F4FF');

  return (
    <Box
      bg={cardBg}
      borderRadius="16px"
      boxShadow="0 2px 16px rgba(0,0,0,0.08)"
      w="full"
      h="260px"
      overflow="hidden"
      cursor="pointer"
      style={{
        perspective: '1000px',
        transition: 'box-shadow 0.2s ease',
      }}
      _hover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Rotating inner element */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >

        {/* ── FRONT face ─────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px 14px',
            overflow: 'hidden',
          }}
        >
          {/* Initials avatar */}
          <Avatar.Root
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Avatar.Fallback
              name={member.name}
              style={{
                background: 'linear-gradient(135deg, #2563EB, #0A1628)',
                color: 'white',
                fontSize: '24px',
                fontWeight: '700',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                lineHeight: '1',
                letterSpacing: '0.05em',
              }}
            />
          </Avatar.Root>

          {/* Name */}
          <p style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '14px',
            color: nameColor,
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: '4px',
            position: 'relative',
            zIndex: 1,
          }}>
            {member.name}
          </p>

          {/* Role */}
          <p style={{
            margin: 0,
            fontSize: '12px',
            color: '#F59E0B',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
          }}>
            {member.role}
          </p>

          {/* Info icon hint */}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <Tooltip.Root openDelay={200} closeDelay={100}>
              <Tooltip.Trigger asChild>
                <span style={{ display: 'inline-flex', cursor: 'help' }}>
                  <MdInfoOutline style={{ fontSize: '18px', color: '#9CA3AF' }} aria-hidden="true" />
                </span>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>Hover to learn more</Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip.Root>
          </div>
        </div>

        {/* ── BACK face ──────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#0A1628',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px',
            overflow: 'hidden',
          }}
        >
          {/* Role pill badge */}
          <div style={{
            background: 'rgba(245,158,11,0.2)',
            borderRadius: '9999px',
            padding: '4px 12px',
            marginBottom: '12px',
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B' }}>
              {member.role}
            </span>
          </div>

          {/* Bio */}
          <p style={{
            margin: 0,
            fontSize: '12px',
            color: 'rgba(255,255,255,0.88)',
            textAlign: 'center',
            lineHeight: 1.65,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            {member.bio}
          </p>

          {/* Social icon links */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '14px', position: 'relative', zIndex: 1 }}>
            <MotionA
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              style={{ color: 'white', fontSize: '20px', display: 'inline-flex' }}
              whileHover={{ color: '#F59E0B' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedin aria-hidden="true" />
            </MotionA>
            <MotionA
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Twitter`}
              style={{ color: 'white', fontSize: '20px', display: 'inline-flex' }}
              whileHover={{ color: '#F59E0B' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaTwitter aria-hidden="true" />
            </MotionA>
          </div>
        </div>

      </motion.div>
    </Box>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const Team = () => {
  const sectionBg = useColorModeValue('#F8FAFF', '#0d1d35');
  const textColor = useColorModeValue('#0A1628', '#F0F4FF');
  const subColor  = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      id="team"
      bg={sectionBg}
      py={{ base: 20, md: 28 }}
      px={{ base: 6, md: 12, lg: 16 }}
    >
      <Box maxW="1280px" mx="auto">

        {/* ── Section header ─────────────────────────────────────────── */}
        <MotionBox
          textAlign="center"
          mb={{ base: 12, md: 16 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box mb={2} display="flex" alignItems="center" justifyContent="center" gap={3}>
            <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" />
            <Text fontSize="11px" fontWeight="700" letterSpacing="0.18em" color="#F59E0B" textTransform="uppercase">
              The People Behind the Mission
            </Text>
          </Box>

          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="800"
            color={textColor}
            letterSpacing="-0.02em"
            mb={6}
          >
            Meet Our Team
          </Heading>

          <Text fontSize={{ base: 'md', md: 'lg' }} color={subColor} maxW="460px" mx="auto" lineHeight="1.8">
            Passionate individuals united by a shared mission to create lasting change.
          </Text>
        </MotionBox>

        {/* ── Team cards ─────────────────────────────────────────────── */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap={{ base: 4, md: 5, lg: 6 }}
        >
          {TEAM.map((member, i) => (
            <MotionBox
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TeamCard member={member} />
            </MotionBox>
          ))}
        </Box>

      </Box>
    </Box>
  );
};

export default Team;
