import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const UnderDevelopment = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      bg="#f2f2f2"
    >
      <Box p="4" borderWidth="1px" borderRadius="lg" bg="white">
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
          Feature Under Development
        </Text>
        <Text mt="2" color="gray.600">
          We're working on this feature. Stay tuned for updates!
        </Text>
      </Box>
    </Flex>
  );
};

export default UnderDevelopment;
