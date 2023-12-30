import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Image,
  CircularProgress,
  Text,
  Select,
  Heading,
  Stack,
  Center,
  CircularProgressLabel,
} from "@chakra-ui/react";
import imageUrl from "./images/user analysis.jpeg";
import Nav from "./Nav";
import { useAuth } from "./Context";
import beginnerimg from "./images/beginner.svg";
import intermediateimg from "./images/intermediate.svg";
import expertimg from "./images/Expert.svg";

const UserPage = () => {
  const categories = [
    "Matrix",
    "String",
    "Searching & Sorting",
    "LinkedList",
    "Binary Trees",
    "Binary Search Trees",
    "Greedy",
    "BackTracking",
    "Stacks & Queues",
    "Heap",
    "Graph",
    "Trie",
    "Dynamic Programming",
    "Bit Manipulation",
  ];
  // const { userId } = useAuth();
  const userId = "65660576a17808e0ad1e8ced";

  const [userData, setUserData] = useState(null);
  const [totalQuestions, settotal] = useState(0);
  const [totalCompleted, setcompleted] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState(null);
  const progressValue = ((totalCompleted / totalQuestions) * 100).toFixed(2);
  const [selectimg, setselectimg] = useState(beginnerimg);
  const [completedtag, setcompletedtag] = useState(null);
  const [tagsolved, settagsolved] = useState(0);
  const [tagtotal, settagtotal] = useState(0);
  const selectvalue = ((tagsolved / tagtotal) * 100).toFixed(2);

  const messagedisp = [
    `As per the experts review you need 
  to increase the accuracy of logical 
  concepts of the selected topic and
  also quality of the code. Modularity 
  is also considered in interviews as per now keep trying and become samurai coder`,
    `As per the experts review you need 
  to put more effort on how to decrease the time complexity and also should solve question where space complexity is minimal rest you do grasp a good logical thinking keep it up`,
    `As per the experts review you are now a coding samurai and can achieve highest paying jobs , expert bless you with your future and thankyou to be consistent with the DSA sheet. Wish you best for your future.`,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/mlroutes/combined-data/${userId}`
        );

        if (response.status === 200) {
          setUserData(response.data.mldata);
          settotal(response.data.totalqestions);
          setcompleted(response.data.totalcompleted);
          setcompletedtag(response.data.combinedData);
          console.log(response.data);
          let sum = 0;
          for (const keys in response.data.mldata) {
            sum += response.data.mldata[keys];
          }
          const categoryScore = sum / Object.keys(response.data.mldata).length;
          // console.log(categoryScore);
          // Determine the message index based on the category score
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
    // You can perform additional logic based on the selected category if needed

    settagsolved(completedtag.totalCompletedQuestionsPerTag[selectedValue]);
    settagtotal(completedtag.totalQuestionsPerTag[selectedValue]);
    let messageIndex, image;
    if (selectvalue >= 0 && selectvalue < 0.4) {
      messageIndex = 0;
      image = beginnerimg;
    } else if (selectvalue >= 0.4 && selectvalue < 0.7) {
      messageIndex = 1;
      image = intermediateimg;
    } else {
      messageIndex = 2;
      image = expertimg;
    }

    // Update the message based on the calculated index
    const updatedMessage = messagedisp[messageIndex];

    // Update the state with the updated message
    setMessage(updatedMessage);
    setselectimg(image);
  };

  return (
    <>
      <Nav />
      <Center bg="white">
        <Heading bg="white" color="black" fontSize="xxx-large">
          User Profile
        </Heading>
      </Center>
      <Flex
        p={4}
        bg="white"
        alignItems="center"
        fontFamily="Inter-Regular, Helvetica"
      >
        <Box textAlign="center" flex="1" ml="5%">
          <Image
            src={imageUrl}
            alt="User Image"
            boxSize="35%"
            ml="20"
            mt="5%"
          />
          <Box
            bg="#92E3A9"
            p={5}
            borderRadius="30px"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color="black"
            maxWidth="600px"
            width="100%"
            mt="5%"
            // Adjusted ml value
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              color="black"
              gap="7"
            >
              <Heading fontSize="28px">Topic Review </Heading>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="2"
                gap="10"
              >
                <Stack>
                  <Select
                    placeholder="Select Category"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    width="100%"
                    mb="4"
                    bg="white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                  <Box
                    bg="#292626"
                    width="100%"
                    borderRadius="19px"
                    justifyContent="space-between"
                    alignItems="center" // Updated 'allignItem' to 'alignItems'
                    display="flex" // Added to enable flex layout
                    mb="3"
                  >
                    <Stack>
                      <Text color="white">{selectedCategory}</Text>
                      <CircularProgress
                        value={selectvalue}
                        size="45%"
                        color="yellow"
                        ml="5"
                        trackColor="black"
                        capIsRound="true"
                        thickness="7px"
                        maxWidth="300px"
                      >
                        <CircularProgressLabel
                          color="white"
                          fontSize="15px"
                          justifySelf="center"
                          alignSelf="center"
                          mt="-2%"
                          ml="-28%"
                        >
                          {selectvalue}%<div>Completed</div>
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Stack>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      mt="4"
                      gap="10"
                      ml="-19%"
                    >
                      {" "}
                      {/* Added Flex container */}
                      <Heading as="h3" fontSize="20px" color="white">
                        {tagsolved}/{tagtotal}
                        <div>Solved</div>
                      </Heading>
                      <Stack spacing="2" mr="10" mb="5">
                        <Text color="white" fontSize="12px">
                          Batch Earned
                        </Text>
                        <Image
                          src={selectimg}
                          alt="beginner"
                          boxSize="100%"
                          ml="10%"
                        />
                      </Stack>
                    </Flex>
                  </Box>
                </Stack>
                <Stack mr="5" mt="30px">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mt="4"
                    gap="6"
                    ml="-19%"
                  >
                    <Text fontSize="15px">Beginner</Text>
                    <Image src={beginnerimg} alt="beginner" ml="20px" />
                  </Flex>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mt="4"
                    gap="6"
                    ml="-19%"
                  >
                    <Text fontSize="15px">Intermediate</Text>
                    <Image src={intermediateimg} alt="beginner" />
                  </Flex>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mt="4"
                    gap="16"
                    ml="-19%"
                  >
                    <Text fontSize="15px">Expert</Text>
                    <Image src={expertimg} alt="beginner" />
                  </Flex>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Flex
          flexDirection="column"
          justifyContent="center"
          ml={1}
          textAlign="center"
          gap="10"
          mr="5%" // Adjusted the gap between the left and right sides
          mt="3%"
        >
          {/* Top Card */}
          <Box
            bg="#92E3A9"
            p={4}
            borderRadius="30px"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            maxWidth="400px"
            width="95%"
            mb="5" // Adjusted mb value
            mr="10" // Adjusted mr value
          >
            <Stack alignItems="center" justifyContent="center">
              <Heading fontSize="28px" color="black" mb="4">
                Progress
              </Heading>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="2"
              >
                <CircularProgress
                  value={progressValue}
                  size="70%"
                  color="yellow"
                  ml="3"
                  trackColor="black"
                  capIsRound="true"
                  thickness="7px"
                >
                  <CircularProgressLabel
                    color="black"
                    fontSize="20px"
                    justifySelf="center"
                    alignSelf="center"
                    mt="-2%"
                    ml="-15%"
                  >
                    {progressValue}%<div>Completed</div>
                  </CircularProgressLabel>
                </CircularProgress>

                {/* Text on the right side */}
                <Heading as="h3" fontSize="28px" mr="17" mt="-5%" color="black">
                  {totalCompleted}/{totalQuestions}
                  <div>Solved</div>
                </Heading>
              </Box>
            </Stack>
          </Box>

          {/* Bottom Card */}
          <Box
            bg="#92E3A9"
            p={4}
            borderRadius="30px"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color="black"
            maxWidth="400px"
            width="100%"
            mr="10" // Adjusted mr value
            mt="3%"
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              color="black"
              gap="7"
            >
              <Heading fontSize="28px">Expert Review </Heading>

              <Box bg="#292626" width="100%" borderRadius="19px">
                <Text color="white" p={5} fontSize="18px">
                  {message || "Expert review says...."}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default UserPage;
