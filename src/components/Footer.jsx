import { Box, Text } from '@chakra-ui/react';

// Placeholder — full Footer to be built out
const Footer = () => {
  return (
    <Box as="footer" bg="#0A1628" color="white" px={8} py={10} textAlign="center">
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} Ambrose Akuno Auma Foundation. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
