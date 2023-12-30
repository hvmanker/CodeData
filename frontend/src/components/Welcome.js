import React from "react";
import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import Category from "./questions/Category";
import Nav from "./Nav";

const Welcome = () => {
  // const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <ChakraProvider>
      <Box bg="white" minHeight="100vh">
        <Nav />
        <Category />
      </Box>
    </ChakraProvider>
  );
};

export default Welcome;
