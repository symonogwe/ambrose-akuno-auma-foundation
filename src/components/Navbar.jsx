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
import { useColorMode, useColorModeValue } from './ui/ColorModeProvider';
import { scrollToSection } from '../utils/smoothScroll';

const MotionBox = motion(Box);

const NAV_LINKS = [
  { label: 'Home',     href: '#home',     target: 'home'     },
  { label: 'About',    href: '#about',    target: 'about'    },
  { label: 'Programs', href: '#programs', target: 'programs' },
  { label: 'Impact',   href: '#impact',   target: 'impact'   },
];

const OBSERVED_SECTIONS = ['home', 'about', 'programs', 'impact', 'team', 'contact'];

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { open, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // ── Color tokens ────────────────────────────────────────────────────────────
  const scrolledBg          = useColorModeValue('white', '#0A1628');
  const scrolledBorderColor = useColorModeValue('gray.100', 'gray.800');
  const textColor           = useColorModeValue('#0A1628', '#F7F8FA');
  const foundationColor     = useColorModeValue('gray.600', 'gray.400');
  const drawerBg            = useColorModeValue('#FFFFFF', '#0A1628');
  const drawerBorder        = useColorModeValue('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.08)');
  const toggleHoverBg       = useColorModeValue('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.1)');
  const navLinkColor        = useColorModeValue('gray.700', 'whiteAlpha.900');

  const navBg = scrolled ? scrolledBg : 'transparent';

  // ── Scroll detection ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section detection via IntersectionObserver ───────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );
    OBSERVED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
        borderBottom={scrolled ? '1px solid' : 'none'}
        borderColor={scrolled ? scrolledBorderColor : 'transparent'}
        boxShadow={scrolled ? 'sm' : 'none'}
        style={{ transition: 'background 0.35s ease, padding 0.35s ease, border-color 0.35s ease' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        <Flex align="center" justify="space-between" maxW="1280px" mx="auto">

          {/* ── Logo — typographic, no icon ─────────────────────────── */}
          <HStack gap={1} align="baseline" cursor="pointer" onClick={() => scrollToSection('home')}>
            <Text
              fontWeight="800"
              fontSize="lg"
              color="#2563EB"
              letterSpacing="widest"
            >
              AAAF
            </Text>
            <Text
              fontWeight="300"
              fontSize="md"
              color={foundationColor}
            >
              Foundation
            </Text>
          </HStack>

          {/* ── Desktop nav links ─────────────────────────────────── */}
          <HStack as="ul" gap={8} listStyleType="none" display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.target;
              return (
                <Box
                  as="li"
                  key={link.label}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.target); }}
                  cursor="pointer"
                  transition="all 0.2s ease"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? '600' : '500'}
                    color={isActive ? '#2563EB' : navLinkColor}
                    borderBottom={isActive ? '2px solid #2563EB' : '2px solid transparent'}
                    pb="2px"
                    _hover={{ color: '#2563EB' }}
                    transition="all 0.2s ease"
                  >
                    {link.label}
                  </Text>
                </Box>
              );
            })}
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
            >
              {colorMode === 'light' ? <BsMoonFill aria-hidden="true" /> : <BsSunFill aria-hidden="true" />}
            </IconButton>

            <Button
              size="sm"
              py={2}
              px={6}
              borderRadius="4px"
              fontWeight="700"
              fontSize="sm"
              bg="#2563EB"
              color="white"
              _hover={{ bg: '#1d4ed8' }}
              style={{ transition: 'all 0.2s ease' }}
              // TODO: Replace with donation platform URL
              onClick={() => scrollToSection('contact')}
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
                <HStack gap={1} align="baseline">
                  <Text fontWeight="800" letterSpacing="widest" fontSize="md" color="#2563EB">
                    AAAF
                  </Text>
                  <Text fontWeight="300" fontSize="sm" color={foundationColor}>
                    Foundation
                  </Text>
                </HStack>
                <DrawerCloseTrigger position="static" top="unset" insetEnd="unset" />
              </Flex>
            </DrawerHeader>

            <DrawerBody px={5} pt={8}>
              <Stack gap={6}>
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.target;
                  return (
                    <Text
                      key={link.label}
                      as="button"
                      textAlign="left"
                      fontSize="lg"
                      fontWeight={isActive ? '600' : '500'}
                      color={isActive ? '#2563EB' : undefined}
                      cursor="pointer"
                      _hover={{ color: '#2563EB' }}
                      style={{ transition: 'all 0.2s ease', background: 'none', border: 'none', padding: 0 }}
                      onClick={() => {
                        scrollToSection(link.target);
                        onClose();
                      }}
                    >
                      {link.label}
                    </Text>
                  );
                })}

                <Box pt={4} borderTop="1px solid" borderColor={drawerBorder}>
                  <Button
                    w="full"
                    borderRadius="4px"
                    fontWeight="700"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: '#1d4ed8' }}
                    style={{ transition: 'all 0.2s ease' }}
                    // TODO: Replace with donation platform URL
                    onClick={() => { scrollToSection('contact'); onClose(); }}
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
