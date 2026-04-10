import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  FieldRoot,
  FieldLabel,
} from "@chakra-ui/react";
import {
  MdLocationOn,
  MdEmail,
  MdSend,
  MdAccessTime,
  MdPhone,
} from "react-icons/md";
import {
  useColorModeValue,
  useColorMode,
} from "../components/ui/ColorModeProvider";
import { toaster } from "../components/ui/toaster";

// TODO: Replace with actual HQ Google Maps embed URL
// To get embed URL: google.com/maps → search address → Share → Embed a map → copy src URL
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.5950!3d51.5105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766a9a3e5a7e3d%3A0xa27ef9f21b3b4a7!2sSlough%2C+UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk";

const HQMap = () => {
  const { colorMode } = useColorMode();

  const sectionBg = useColorModeValue("gray.50", "gray.900");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("gray.800", "white");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toaster.create({
      type: "success",
      title: "Message Sent! 🎉",
      description:
        "Thank you for reaching out. We'll get back to you within 24 hours.",
      duration: 5000,
    });
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <Box as="section" bg={sectionBg} py={20} px={6}>
      <Container maxW="7xl">
        {/* Section label */}
        <Text
          textAlign="center"
          color="#F59E0B"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="widest"
          textTransform="uppercase"
          mb={3}
        >
          Our Location &amp; Contact
        </Text>

        {/* Section heading */}
        <Heading
          as="h2"
          textAlign="center"
          fontFamily="heading"
          color={headingColor}
          mb={12}
          fontSize={{ base: "3xl", md: "4xl" }}
        >
          Find Us
        </Heading>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="start">
          {/* LEFT — Embedded Map */}
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Map iframe with gold border wrapper */}
            <Box
              border="2px solid rgba(245,158,11,0.4)"
              borderRadius="16px"
              overflow="hidden"
              boxShadow="0 10px 15px rgba(0,0,0,0.1)"
            >
              <Box
                as="iframe"
                src={MAP_EMBED_URL}
                title="AAAF Headquarters location map"
                width="100%"
                height="480px"
                border="none"
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  filter:
                    colorMode === "dark"
                      ? "invert(90%) hue-rotate(180deg)"
                      : "none",
                  transition: "filter 0.3s ease",
                  display: "block",
                }}
              />
            </Box>

            {/* Address row */}
            <Flex
              align="center"
              gap={2}
              mt={3}
              color={subTextColor}
              fontSize="sm"
            >
              <Box
                as={MdLocationOn}
                color="#F59E0B"
                fontSize="18px"
                flexShrink={0}
                aria-hidden="true"
              />
              <Text>123 High Street, Slough, SL1 1HP, United Kingdom</Text>
            </Flex>

            {/* Email row */}
            <Flex
              align="center"
              gap={2}
              mt={2}
              color={subTextColor}
              fontSize="sm"
            >
              <Box
                as={MdEmail}
                color="#F59E0B"
                fontSize="18px"
                flexShrink={0}
                aria-hidden="true"
              />
              <Text>info@ambroseakunoaumafoundation.org</Text>
            </Flex>

            {/* Hours + Phone info row */}
            <Flex gap={4} mt={4} flexWrap="wrap">
              <Flex align="center" gap={2} color={subTextColor} fontSize="sm">
                <Box
                  as={MdAccessTime}
                  color="#F59E0B"
                  fontSize="18px"
                  flexShrink={0}
                  aria-hidden="true"
                />
                <Text>Mon–Fri: 9am–5pm GMT</Text>
              </Flex>
              <Flex align="center" gap={2} color={subTextColor} fontSize="sm">
                <Box
                  as={MdPhone}
                  color="#F59E0B"
                  fontSize="18px"
                  flexShrink={0}
                  aria-hidden="true"
                />
                {/* TODO: Replace with real phone number */}
                <Text>+44 (0) 000 000 0000</Text>
              </Flex>
            </Flex>
          </Motion.div>

          {/* RIGHT — Contact Form */}
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Text
              color="#F59E0B"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={2}
            >
              Get In Touch
            </Text>

            {/* Gold vertical accent line (same as Mission section) */}
            <Box w="4px" h="48px" bg="#F59E0B" borderRadius="full" mb={3} />

            <Heading
              as="h3"
              fontFamily="heading"
              color={headingColor}
              mb={3}
              fontSize={{ base: "2xl", md: "3xl" }}
            >
              Contact Us
            </Heading>

            <Text color={subTextColor} mb={8}>
              Have questions or want to volunteer? We&apos;d love to hear from
              you.
            </Text>

            <Box as="form" onSubmit={handleSubmit}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
                <FieldRoot required>
                  <FieldLabel fontSize="sm" color={subTextColor}>
                    Full Name
                  </FieldLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    bg={inputBg}
                    borderColor={inputBorder}
                    borderRadius="8px"
                    _focus={{
                      borderColor: "#2563EB",
                      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
                    }}
                  />
                </FieldRoot>

                <FieldRoot required>
                  <FieldLabel fontSize="sm" color={subTextColor}>
                    Email Address
                  </FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    bg={inputBg}
                    borderColor={inputBorder}
                    borderRadius="8px"
                    _focus={{
                      borderColor: "#2563EB",
                      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
                    }}
                  />
                </FieldRoot>
              </SimpleGrid>

              <FieldRoot required mb={4}>
                <FieldLabel fontSize="sm" color={subTextColor}>
                  Subject
                </FieldLabel>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  bg={inputBg}
                  borderColor={inputBorder}
                  borderRadius="8px"
                  _focus={{
                    borderColor: "#2563EB",
                    boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
                  }}
                />
              </FieldRoot>

              <FieldRoot required mb={6}>
                <FieldLabel fontSize="sm" color={subTextColor}>
                  Message
                </FieldLabel>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more..."
                  rows={5}
                  resize="vertical"
                  bg={inputBg}
                  borderColor={inputBorder}
                  borderRadius="8px"
                  _focus={{
                    borderColor: "#2563EB",
                    boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
                  }}
                />
              </FieldRoot>

              {/* Send button with Framer Motion scale hover */}
              <Motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  width="100%"
                  bg="#2563EB"
                  color="white"
                  borderRadius="8px"
                  py={6}
                  _hover={{ bg: "#F59E0B", color: "gray.900" }}
                >
                  <Flex align="center" gap={2}>
                    Send Message
                    <Box as={MdSend} fontSize="16px" aria-hidden="true" />
                  </Flex>
                </Button>
              </Motion.div>
            </Box>
          </Motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HQMap;
