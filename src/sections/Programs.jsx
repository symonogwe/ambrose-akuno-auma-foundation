import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
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
import { MdArrowForward } from 'react-icons/md';
import { useColorModeValue } from '../components/ui/ColorModeProvider';
import youthImg from '../assets/youth-mentorship.jpg';
import waterImg from '../assets/clean-water.jpg';
import educationImg from '../assets/education-access.jpg';

const MotionBox = motion(Box);

// ── Program data ──────────────────────────────────────────────────────────────

const PROGRAMS = [
  {
    id: 1,
    category: 'YOUTH DEVELOPMENT',
    title: 'Youth Mentorship',
    description: 'Guiding the next generation through leadership workshops and personal development.',
    image: youthImg,
    modalTitle: 'Youth Mentorship Program',
    modalDescription: `Our Youth Mentorship Program is at the heart of everything we do. We believe that every young person, regardless of their background, deserves access to guidance, opportunity, and inspiration.

Through structured one-on-one mentorship, group leadership workshops, career counseling sessions, and personal development bootcamps, we equip young people aged 13–25 with the tools they need to thrive in the modern world.

We partner with local schools, community centers, and corporate sponsors across the UK and East Africa to ensure our reach continues to grow. Our mentors are carefully vetted professionals who volunteer their time and expertise to shape the next generation of leaders.

Every workshop is designed around real-world skills — public speaking, financial literacy, entrepreneurship, digital skills, and emotional intelligence.`,
    stat: '2,500+ young people mentored',
  },
  {
    id: 2,
    category: 'CLEAN WATER',
    title: 'Clean Water Initiatives',
    description: 'Safe, accessible clean water for remote villages across East Africa.',
    image: waterImg,
    modalTitle: 'Clean Water Initiatives',
    modalDescription: `Access to clean, safe drinking water is a fundamental human right — yet millions of people in remote communities across East Africa still lack this basic necessity.

Our Clean Water Initiative works directly with village elders, local engineers, and international partners to identify communities most in need. We drill deep boreholes, install solar-powered water pumps, and build filtration systems designed to last decades with minimal maintenance.

Beyond infrastructure, we run community hygiene education programs teaching proper sanitation practices, handwashing techniques, and water conservation methods. We train local technicians to maintain the systems long after we leave, ensuring sustainability.

Each completed project transforms an entire village — reducing waterborne disease, freeing children from hours of daily water collection, and giving communities the foundation to grow and prosper.`,
    stat: '47 clean water projects completed',
  },
  {
    id: 3,
    category: 'EDUCATION',
    title: 'Education Access',
    description: 'Scholarships and resources ensuring no child is left behind.',
    image: educationImg,
    modalTitle: 'Education Access Program',
    modalDescription: `Education is the single most powerful tool for breaking the cycle of poverty. Our Education Access Program is built on the belief that no child should be denied a quality education due to financial hardship or lack of resources.

We provide full and partial scholarships to students from primary through university level. We supply school materials including books, uniforms, stationery, and digital devices to students who cannot afford them. We renovate and build classrooms, libraries, and computer labs in underserved schools.

Our team works closely with teachers through professional development training, helping them deliver better outcomes for their students. We also run after-school tutoring programs and holiday learning camps to ensure no student falls behind.

The results speak for themselves — schools we partner with consistently show improved attendance rates, higher exam pass rates, and greater numbers of students progressing to higher education.`,
    stat: '1,200+ children supported annually',
  },
];

// ── Hover variants — parent triggers state, image child reads it ──────────────

const cardVariants = {
  rest:  { boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
  hover: { boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
};

const imageVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.05 },
};

// ── Program Card ──────────────────────────────────────────────────────────────

const ProgramCard = ({ program, onOpen, isLarge }) => (
  <MotionBox
    position="relative"
    overflow="hidden"
    borderRadius="20px"
    h={isLarge ? { base: '400px', md: '500px' } : { base: '240px', md: '240px' }}
    cursor="pointer"
    onClick={onOpen}
    // Variant-based hover: "hover" propagates to image child
    initial="rest"
    whileHover="hover"
    animate="rest"
    variants={cardVariants}
  >
    {/* Full-bleed image — zooms when parent enters "hover" variant */}
    <MotionBox
      position="absolute"
      top={0} left={0} right={0} bottom={0}
      backgroundImage={`url(${program.image})`}
      backgroundSize="cover"
      backgroundPosition="center"
      variants={imageVariants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />

    {/* Dark gradient overlay — text is always legible */}
    <Box
      position="absolute"
      top={0} left={0} right={0} bottom={0}
      background="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
    />

    {/* Text content — pinned to bottom of card */}
    <Box position="absolute" bottom={0} left={0} right={0} p={6}>
      <Text
        fontSize="xs"
        fontWeight="600"
        letterSpacing="0.12em"
        color="#F59E0B"
        textTransform="uppercase"
        mb={2}
      >
        {program.category}
      </Text>

      <Heading
        as="h3"
        fontFamily="heading"
        fontSize="xl"
        fontWeight="700"
        color="white"
        mb={2}
        lineHeight="1.3"
      >
        {program.title}
      </Heading>

      <Text
        fontSize="sm"
        color="rgba(255,255,255,0.85)"
        lineHeight="1.6"
        mb={4}
        lineClamp={2}
      >
        {program.description}
      </Text>

      {/* Learn More row — stopPropagation so it doesn't double-fire onOpen */}
      <Flex
        display="inline-flex"
        align="center"
        gap={2}
        color="white"
        fontSize="sm"
        fontWeight="600"
        cursor="pointer"
        _hover={{ color: '#F59E0B' }}
        transition="color 0.2s ease"
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
      >
        <Text>Learn More</Text>
        <MotionBox
          display="inline-flex"
          alignItems="center"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <Box as={MdArrowForward} fontSize="16px" aria-hidden="true" />
        </MotionBox>
      </Flex>
    </Box>
  </MotionBox>
);

// ── Program Modal ─────────────────────────────────────────────────────────────
// Each instance is controlled by its own dedicated useDisclosure.
// No motion wrappers — Ark UI Dialog handles its own transitions.

const ProgramModal = ({ program, open, onClose }) => {
  const modalBg  = useColorModeValue('#FFFFFF', '#0A1628');
  const subColor = useColorModeValue('#4B5563', '#94A3B8');

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
          {/* Image header — photo fills area, dark overlay, title at bottom */}
          <DialogHeader p={0} position="relative" overflow="hidden" h="200px">
            {/* Background image */}
            <Box
              position="absolute"
              top={0} left={0} right={0} bottom={0}
              backgroundImage={`url(${program.image})`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
            {/* Dark overlay */}
            <Box
              position="absolute"
              top={0} left={0} right={0} bottom={0}
              background="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)"
            />
            {/* Title text at bottom of header */}
            <Box position="absolute" bottom={0} left={0} right={0} p={5}>
              <DialogTitle asChild>
                <Heading
                  as="h3"
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="700"
                  color="white"
                >
                  {program.modalTitle}
                </Heading>
              </DialogTitle>
            </Box>
          </DialogHeader>

          <DialogBody px={6} pb={2} pt={5}>
            {/* pre-line preserves paragraph breaks in the template literal */}
            <Text
              fontSize="md"
              color={subColor}
              lineHeight="1.8"
              mb={4}
              style={{ whiteSpace: 'pre-line' }}
            >
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

          {/* White close button floats over the image header */}
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

  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('#0A1628', '#F0F4FF');
  const subColor  = useColorModeValue('#4B5563', '#94A3B8');

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
          <Box mb={2} display="flex" alignItems="center" justifyContent="center" gap={3}>
            <Box w="3px" h="16px" bg="#F59E0B" borderRadius="full" />
            <Text fontSize="11px" fontWeight="700" letterSpacing="0.18em" color="#F59E0B" textTransform="uppercase">
              What We Do
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
            Our Programs
          </Heading>

          <Text fontSize={{ base: 'md', md: 'lg' }} color={subColor} maxW="520px" mx="auto" lineHeight="1.8">
            Targeted initiatives designed to solve critical challenges and foster independence.
          </Text>
        </MotionBox>

        {/* ── Asymmetric bento grid ───────────────────────────────────── */}
        {/*   Desktop: Card 1 (large) spans both rows on the left;        */}
        {/*            Cards 2 & 3 stack at 240 px each on the right.     */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gridTemplateRows={{ base: 'auto', md: '240px 240px' }}
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
