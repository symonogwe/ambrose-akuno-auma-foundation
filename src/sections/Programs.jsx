import {
  Box,
  Text,
  Heading,
  Button,
  HStack,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiDroplet, FiBook } from 'react-icons/fi';
import { MdArrowForward } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';

const MotionBox = motion(Box);

// ── Program data ──────────────────────────────────────────────────────────────

const PROGRAMS = [
  {
    id: 1,
    title: 'Youth Mentorship',
    shortDesc: 'Guiding the next generation through leadership workshops and personal development.',
    gradient: 'linear-gradient(145deg, #f97316 0%, #fb923c 45%, #fbbf24 100%)',
    icon: FiUsers,
    stat: '2,500+ young people mentored',
    modalDescription:
      'Guiding the next generation through leadership workshops, career counseling, and personal development programs. We partner with local schools and community centers to reach young people aged 13–25.',
  },
  {
    id: 2,
    title: 'Clean Water Initiatives',
    shortDesc: 'Safe, accessible clean water for remote villages across East Africa.',
    gradient: 'linear-gradient(145deg, #06b6d4 0%, #0284c7 50%, #14b8a6 100%)',
    icon: FiDroplet,
    stat: '47 clean water projects completed',
    modalDescription:
      'Drilling wells and installing filtration systems to provide safe, accessible drinking water to remote villages across East Africa.',
  },
  {
    id: 3,
    title: 'Education Access',
    shortDesc: 'Scholarships and resources ensuring no child is left behind.',
    gradient: 'linear-gradient(145deg, #7c3aed 0%, #6d28d9 45%, #4f46e5 100%)',
    icon: FiBook,
    stat: '1,200+ children supported annually',
    modalDescription:
      'Providing scholarships, school supplies, and renovating classrooms to ensure no child is left behind. We believe education is the foundation of lasting change.',
  },
];

// ── Program Card ──────────────────────────────────────────────────────────────

const ProgramCard = ({ program, onOpen, isLarge }) => {
  const cardBg    = useColorModeValue('#FFFFFF', '#0d1d35');
  const textColor = useColorModeValue('#0A1628', '#F0F4FF');
  const subColor  = useColorModeValue('#4B5563', '#94A3B8');
  const Icon = program.icon;

  return (
    <Box
      bg={cardBg}
      borderRadius="20px"
      overflow="hidden"
      h="full"
      minH={isLarge ? { base: '320px', md: '100%' } : 'auto'}
      display="flex"
      flexDirection="column"
      cursor="pointer"
      boxShadow="0 4px 6px rgba(0,0,0,0.07)"
      borderTop="3px solid transparent"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        borderTop: '3px solid #F59E0B',
      }}
      onClick={onOpen}
    >
      {/* Gradient banner */}
      <Box
        background={program.gradient}
        h={isLarge ? { base: '180px', md: '260px' } : '150px'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        flexShrink={0}
      >
        <Box position="absolute" top="-24px" right="-24px" w="110px" h="110px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
        <Box position="absolute" bottom="-32px" left="-32px" w="130px" h="130px" borderRadius="full" bg="rgba(255,255,255,0.07)" />
        <Box
          color="white"
          fontSize={isLarge ? '4rem' : '2.8rem'}
          style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.18))', position: 'relative', zIndex: 1 }}
        >
          <Icon />
        </Box>
      </Box>

      {/* Text body */}
      <Box p={isLarge ? 7 : 5} flex={1} display="flex" flexDirection="column">
        <Heading
          as="h3"
          fontFamily="heading"
          fontSize="xl"
          fontWeight="700"
          color={textColor}
          mb={2}
          lineHeight="1.3"
        >
          {program.title}
        </Heading>
        <Text fontSize="sm" color={subColor} lineHeight="1.75" flex={1}>
          {program.shortDesc}
        </Text>
        <Box mt={5}>
          <HStack
            display="inline-flex"
            align="center"
            gap={1}
            color="#F59E0B"
            fontWeight="600"
            fontSize="sm"
            cursor="pointer"
            _hover={{ color: '#2563EB' }}
            transition="color 0.2s ease"
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
          >
            <Text>Learn More</Text>
            <MotionBox display="inline-flex" alignItems="center" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Box as={MdArrowForward} fontSize="16px" />
            </MotionBox>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

// ── Program Modal ─────────────────────────────────────────────────────────────
// Each instance is controlled by its own dedicated useDisclosure — no shared
// state, no setTimeout, no motion wrappers that fight Ark UI's Dialog lifecycle.

const ProgramModal = ({ program, open, onClose }) => {
  const modalBg  = useColorModeValue('#FFFFFF', '#0A1628');
  const subColor = useColorModeValue('#4B5563', '#94A3B8');
  const Icon = program.icon;

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => { if (!e.open) onClose(); }}
      size="lg"
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent
          bg={modalBg}
          maxW="520px"
          borderRadius="2xl"
          overflow="hidden"
          position="relative"
        >
          {/* Gradient header — icon + title */}
          <DialogHeader
            background={program.gradient}
            borderRadius="16px 16px 0 0"
            p={6}
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
            position="relative"
            overflow="hidden"
          >
            {/* Decorative rings */}
            <Box position="absolute" top="-20px" right="-20px" w="130px" h="130px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
            <Box position="absolute" bottom="-30px" left="-30px" w="150px" h="150px" borderRadius="full" bg="rgba(255,255,255,0.07)" />

            <Box color="white" fontSize="3rem" style={{ position: 'relative', zIndex: 1 }}>
              <Icon />
            </Box>
            <DialogTitle asChild>
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="700"
                color="white"
                style={{ position: 'relative', zIndex: 1 }}
              >
                {program.title}
              </Heading>
            </DialogTitle>
          </DialogHeader>

          {/* Modal body — no motion wrapper; Ark UI Dialog handles its own transitions */}
          <DialogBody px={6} pb={2} pt={5}>
            <Text fontSize="md" color={subColor} lineHeight="1.85" mb={4}>
              {program.modalDescription}
            </Text>

            {/* Impact stat callout */}
            <Box bg="#F59E0B" color="gray.900" borderRadius="8px" p={3} fontWeight="700" mt={3}>
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" mb={1} opacity={0.7}>
                Impact
              </Text>
              <Text fontSize="lg">
                {program.stat}
              </Text>
            </Box>
          </DialogBody>

          <DialogFooter px={6} pb={6} pt={4} gap={3}>
            <Button variant="ghost" size="sm" borderRadius="full" fontWeight="600" onClick={onClose}>
              Close
            </Button>
            <Button
              size="sm"
              bg="#2563EB"
              color="white"
              borderRadius="full"
              fontWeight="700"
              _hover={{ bg: '#F59E0B', color: '#0A1628' }}
              style={{ transition: 'background 0.2s, color 0.2s' }}
            >
              Get Involved
            </Button>
          </DialogFooter>

          {/* White close button floats over the gradient header */}
          <DialogCloseTrigger color="white" top={3} right={3} _hover={{ bg: 'rgba(255,255,255,0.2)' }} borderRadius="full" />
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const Programs = () => {
  // One useDisclosure per modal — isolated open/close state, no cross-contamination
  const { open: open1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { open: open2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { open: open3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();

  const sectionBg = useColorModeValue('#FFFFFF', '#0A1628');
  const textColor = useColorModeValue('#0A1628', '#F0F4FF');
  const subColor  = useColorModeValue('#4B5563', '#94A3B8');

  // Map each program to its disclosure handlers
  const disclosures = [
    { open: open1, onOpen: onOpen1, onClose: onClose1 },
    { open: open2, onOpen: onOpen2, onClose: onClose2 },
    { open: open3, onOpen: onOpen3, onClose: onClose3 },
  ];

  return (
    <Box
      id="programs"
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
          <Box mb={4} display="flex" alignItems="center" justifyContent="center" gap={3}>
            <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" />
            <Text fontSize="11px" fontWeight="700" letterSpacing="0.18em" color="#F59E0B" textTransform="uppercase">
              What We Do
            </Text>
          </Box>

          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="700"
            color={textColor}
            letterSpacing="-0.02em"
            mb={4}
          >
            Our Programs
          </Heading>

          <Text fontSize={{ base: 'md', md: 'lg' }} color={subColor} maxW="520px" mx="auto" lineHeight="1.8">
            Targeted initiatives designed to solve critical challenges and foster independence.
          </Text>
        </MotionBox>

        {/* ── Bento grid ─────────────────────────────────────────────── */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gridAutoRows={{ md: '1fr' }}
          gap={5}
        >
          {PROGRAMS.map((program, i) => (
            <MotionBox
              key={program.id}
              gridRow={i === 0 ? { md: '1 / 3' } : undefined}
              gridColumn={i === 0 ? { md: '1' } : { md: '2' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.15 }}
            >
              <ProgramCard
                program={program}
                onOpen={disclosures[i].onOpen}
                isLarge={i === 0}
              />
            </MotionBox>
          ))}
        </Box>
      </Box>

      {/* ── Three independent modals, each with its own disclosure ──── */}
      {PROGRAMS.map((program, i) => (
        <ProgramModal
          key={program.id}
          program={program}
          open={disclosures[i].open}
          onClose={disclosures[i].onClose}
        />
      ))}
    </Box>
  );
};

export default Programs;
