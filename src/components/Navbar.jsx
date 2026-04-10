import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  Stack,
  DrawerRoot,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { MdVolunteerActivism } from 'react-icons/md';
import { useColorMode, useColorModeValue } from './ui/ColorModeProvider';

// Wrap Box in Framer Motion so we can animate it as a nav element
const MotionBox = motion(Box);

const NAV_LINKS = [
  { label: 'Home',     href: '#hero'     },
  { label: 'About',    href: '#mission'  },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact',   href: '#impact'   },
];

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { open, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  // Colors resolved from color mode — all hooks called unconditionally at top
  const frostedBg      = useColorModeValue('rgba(255,255,255,0.85)', 'rgba(10,22,40,0.85)');
  const scrolledBorder = useColorModeValue('1px solid rgba(0,0,0,0.08)', '1px solid rgba(255,255,255,0.08)');
  const logoColor      = useColorModeValue('#0A1628',                 '#F7F8FA');
  const drawerBg       = useColorModeValue('#FFFFFF',                 '#0A1628');
  const drawerBorder   = useColorModeValue('rgba(0,0,0,0.08)',        'rgba(255,255,255,0.08)');
  const toggleHoverBg  = useColorModeValue('rgba(0,0,0,0.06)',        'rgba(255,255,255,0.1)');
  // Nav links: gray.700 in light mode, whiteAlpha.900 in dark mode
  const navLinkColor = useColorModeValue('gray.700', 'whiteAlpha.900');

  // Transparent when at top — becomes frosted glass on scroll
  const navBg     = scrolled ? frostedBg  : 'transparent';
  const navBorder = scrolled ? scrolledBorder : 'transparent';
  // Logo + icon color: white over dark hero when unscrolled, theme color once frosted
  const textColor = scrolled ? logoColor : 'white';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    onClose();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────────────── */}
      <MotionBox
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        px={{ base: 5, md: 10, lg: 16 }}
        py={scrolled ? '12px' : '20px'}
        bg={navBg}
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: navBorder,
          transition: 'background 0.35s ease, padding 0.35s ease, border-color 0.35s ease',
        }}
        // Entrance: fade down once on load
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Flex align="center" justify="space-between" maxW="1280px" mx="auto">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <HStack gap={2} cursor="pointer" onClick={() => handleNavClick('#hero')}>
            <Box color="#F59E0B" fontSize="28px" lineHeight={1} display="flex" alignItems="center" aria-hidden="true">
              <MdVolunteerActivism />
            </Box>
            <HStack gap={1} align="baseline">
              <Text
                fontWeight="800"
                fontSize="lg"
                color={textColor}
                letterSpacing="widest"
                transition="color 0.35s"
              >
                AAAF
              </Text>
              <Text
                fontWeight="300"
                fontSize="md"
                color={textColor}
                opacity={0.8}
                transition="color 0.35s"
              >
                Foundation
              </Text>
            </HStack>
          </HStack>

          {/* ── Desktop nav links ─────────────────────────────────── */}
          <HStack as="ul" gap={8} listStyleType="none" display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Box
                as="li"
                key={label}
                onClick={() => handleNavClick(href)}
                cursor="pointer"
                transition="all 0.2s ease"
              >
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color={navLinkColor}
                  _hover={{ color: '#2563EB' }}
                  _active={{ color: '#2563EB' }}
                  transition="all 0.2s ease"
                >
                  {label}
                </Text>
              </Box>
            ))}
          </HStack>

          {/* ── Desktop right side: toggle + donate ───────────────── */}
          <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={textColor}
              onClick={toggleColorMode}
              _hover={{ bg: toggleHoverBg }}
              style={{ transition: 'color 0.35s' }}
            >
              {colorMode === 'light' ? <BsMoonFill aria-hidden="true" /> : <BsSunFill aria-hidden="true" />}
            </IconButton>

            <Button
              size="sm"
              py={2}
              px={6}
              borderRadius="full"
              fontWeight="700"
              fontSize="sm"
              bg="#2563EB"
              color="white"
              _hover={{ bg: '#F59E0B', color: 'gray.900' }}
              style={{ transition: 'all 0.2s ease' }}
            >
              Donate Now
            </Button>
          </HStack>

          {/* ── Mobile: toggle + hamburger ────────────────────────── */}
          <HStack gap={1} display={{ base: 'flex', md: 'none' }}>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={textColor}
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? <BsMoonFill aria-hidden="true" /> : <BsSunFill aria-hidden="true" />}
            </IconButton>
            <IconButton
              aria-label="Open navigation menu"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={textColor}
              onClick={onOpen}
            >
              <FiMenu size={20} aria-hidden="true" />
            </IconButton>
          </HStack>
        </Flex>
      </MotionBox>

      {/* ── Mobile Drawer ──────────────────────────────────────────── */}
      <DrawerRoot
        open={open}
        onOpenChange={(e) => { if (!e.open) onClose(); }}
        placement="end"
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent bg={drawerBg} maxW="280px">

            <DrawerHeader
              borderBottom="1px solid"
              borderColor={drawerBorder}
              py={4}
              px={5}
            >
              <Flex align="center" justify="space-between">
                <HStack gap={2}>
                  <Box color="#F59E0B" fontSize="24px" display="flex" alignItems="center" aria-hidden="true">
                    <MdVolunteerActivism />
                  </Box>
                  <Text fontWeight="800" letterSpacing="widest" fontSize="md">
                    AAAF
                  </Text>
                </HStack>
                {/* DrawerCloseTrigger renders its own accessible close button */}
                <DrawerCloseTrigger
                  position="static"
                  top="unset"
                  insetEnd="unset"
                />
              </Flex>
            </DrawerHeader>

            <DrawerBody px={5} pt={8}>
              <Stack gap={6}>
                {NAV_LINKS.map(({ label, href }) => (
                  <Text
                    key={label}
                    as="button"
                    textAlign="left"
                    fontSize="lg"
                    fontWeight="500"
                    cursor="pointer"
                    _hover={{ color: '#2563EB' }}
                    _active={{ color: '#2563EB' }}
                    style={{ transition: 'all 0.2s ease', background: 'none', border: 'none', padding: 0 }}
                    onClick={() => handleNavClick(href)}
                  >
                    {label}
                  </Text>
                ))}

                <Box pt={4} borderTop="1px solid" borderColor={drawerBorder}>
                  <Button
                    w="full"
                    borderRadius="full"
                    fontWeight="700"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: '#F59E0B', color: 'gray.900' }}
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    Donate Now
                  </Button>
                </Box>
              </Stack>
            </DrawerBody>

          </DrawerContent>
        </DrawerPositioner>
      </DrawerRoot>
    </>
  );
};

export default Navbar;
