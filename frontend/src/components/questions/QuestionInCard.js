import React from "react";
import { Box, Flex, Text, Checkbox, Link, IconButton } from "@chakra-ui/react";
import { FaNotesMedical, FaLink, FaStopwatch } from "react-icons/fa";
import { BiStopwatch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question, onCheckboxChange }) => {
  const navigate = useNavigate();
  const onrevisitChange = () => {
    console.log("revisit hit ");
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="12px"
      overflow="hidden"
      p="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="90%"
      bg="#92E3A9"
      margin="0 auto" // Center the box horizontally
      mb="7"
      mt="7"
    >
      {/* Left Section */}
      <Flex alignItems="center" gap={5}>
        <Flex flexDirection="column" alignItems="center">
          <Checkbox
            onChange={onrevisitChange}
            mr="4"
            ml="4"
            bg="white"
            border="1px solid #38A169"
            borderRadius="2px"
            size="lg"
          />
          <Text fontSize="sm" color="black" mt="1">
            Revisit
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Checkbox
            onChange={onCheckboxChange}
            mr="4"
            ml="2"
            bg="white"
            border="1px solid #38A169"
            borderRadius="2px"
            size="lg"
            isChecked={question.completed}
          />
          <Text fontSize="sm" color="black" mt="1" ml="-1">
            Done
          </Text>
        </Flex>
        <Text fontSize="xl" color="black">
          {question.title}
        </Text>
      </Flex>

      {/* Right Section */}
      <Flex alignItems="center">
        <BiStopwatch
          style={{ marginTop: "20px", marginRight: "10px" }}
          size="30"
          color="blue.500"
        />
        <Link onClick={() => navigate("/underdev")}>
          <IconButton
            icon={<FaNotesMedical />}
            color="black"
            fontSize="27px"
            mr="2"
            bg="#92E3A9"
          />
        </Link>
        {question.links && question.links.URL1 && (
          <Link href={question.links.URL1} isExternal>
            <IconButton
              icon={<FaLink />}
              color="black"
              fontSize="25px"
              bg="#92E3A9"
            />
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default QuestionCard;
