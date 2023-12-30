import React, { useState } from "react";
import { Box, Grid, Heading, useColorModeValue, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { useAuth } from "../Context";
import axios from 'axios'

const Category = () => {
  const {userId}=useAuth()
  const categories = [
    
    'Matrix',
    'String',
    'Searching & Sorting',
    'LinkedList',
    'Binary Trees',
    'Binary Search Trees',
    'Greedy',
    'BackTracking',
    'Stacks & Queues',
    'Heap',
    'Graph',
    'Trie',
    'Dynamic Programming',
    'Bit Manipulation'
];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Handler for the "Start" button click
  const handleStartClick = (category) => {
    // Set the selected category when the "Start" button is clicked
    setSelectedCategory(category);
    navigate(`/questions/${category}`);
  };
  const handleResetClick= async(category)=>
  {
    const response = await axios.post(`${process.env.REACT_APP_URL}/progress/reset`,{userId:userId,category:category})
    //reset  the progress bar
  }

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" fontSize="xl" color="black">
        So! What's We Destroying Today
      </Heading>

      <Grid
        templateColumns="repeat(3, 1fr)"  // Set 3 cards per row
        gap={4}
        justifyItems="center"
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            onStartClick={() => handleStartClick(category)}
            onResetClick={()=> handleResetClick(category)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
