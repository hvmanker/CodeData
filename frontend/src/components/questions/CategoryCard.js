import React from 'react';
import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  Progress,
  Flex
} from '@chakra-ui/react';
import './questionstyle.css';
import { FaPlay, FaUndo } from 'react-icons/fa';

const CategoryCard = ({ category, onStartClick, onResetClick, progress }) => {
  const handleStartClick = () => {
    onStartClick(category);
  };

  const handleResetClick = () => {
    onResetClick(category);
  };

  return (
    <Box
      className="category-card"
      bg="#EDF2F7"
      p={4}
      border="2.5px solid #2f6d4c "
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      width="300px" 
      mx="auto" 
    >
      <Heading as="h2" size="md" mb={4} color="black">
        {category}
      </Heading>

      {/* Progress Bar */}
      <Progress value={50} mb={4} border="1px solid black" borderRadius="12px" bg="#edf2f7"  colorScheme="green"/>

      <Flex justifyContent="space-between">
        <Button
          color="black"
          border="1px solid #2f6d4c"
          bg="#92e3a9"
          onClick={handleStartClick}
          size="sm"
          justifyContent="center"
        >
          <FaPlay size={10} mr="5px" color="black" />
          Start
        </Button>

        <Button
          color="black"
          border="1px solid #2f6d4c"
          bg="#92e3a9"
          onClick={handleResetClick}
          size="sm"
          justifyContent="center"
        >
          <FaUndo size={10} mr="5px" color="black" />
          Reset
        </Button>
      </Flex>
    </Box>
  );
};

export default CategoryCard;
