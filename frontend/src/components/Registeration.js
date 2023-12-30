// RegistrationPage.js
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import lead from "./images/Coding-bro 1.png";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setconfirmPassword] = useState(false);

  
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlelogClick=()=>{
    navigate("/")
  }
  const handleregister = async (e) => {
    e.preventDefault();
    if (
      formData.email.trim() === "" ||
      formData.username.trim() === "" ||
      formData.password.trim() === ""||
      formData.confirmpassword.trim() === ""
    ) {
      toast({
        title: "All fields are necessary",
        status: "error",
      });
      return;
    }
    else if(formData.password!==formData.confirmpassword)
    {
      toast({
        title: "Password does not match",
        status: "error",
      });
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "user",
      });

      if (response.status === 201) {
        

        toast({
          title: "registration complete",
          status: "success",
        });
        handlelogClick()
      } else {
        toast({
          title: "resitration failed",
          status: "error",
        });
      }
    } catch (error) {
      console.error("An error occurred during login:", error);

      if (axios.isAxiosError(error)) {
        toast({
          title: "Network or server error during login",
          status: "error",
        });
      } else {
        toast({
          title: "An unexpected error occurred during login",
          status: "error",
        });
      }
    }
  };
  return (
    <>
      <Flex height="100vh">
        {/* Left Section */}
        <Box flex="1" bgColor="white" p="3" color="black">
          {/* Headings */}
          <Heading as="h1" fontSize="5xl" color="#15993A" mx="20">
            CodeData
          </Heading>
          <Heading as="h2" fontSize="2xl" color="#706F6F" mx="20">
            New Way to Crack Tech Interview
          </Heading>

          {/* Image */}
          <Image src={lead} alt="Login Image" w="82%" mx="20" />
        </Box>

        {/* Right Section */}
        <Box
          flex="1"
          p="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
          color="black"
        >
          {/* Login Form */}
          <Box
            maxW="md"
            w="80%"
            p="10%"
            borderRadius="16px"
            bg="#92E3A9"
            mt="10%"
          >
            <Heading
              as="h3"
              style={{ fontSize: "2xl" }}
              mb="6%"
              color="black"
              textAlign="center"
              mt="-10%"
            >
              Hi, WELCOME
            </Heading>

            <form onSubmit={handleregister}>
              {/* Username Field */}
              <FormControl mb="8">
                <FormLabel>
                  <Flex align="center">
                    <Box as={FaUser} mr="2" />
                    Username
                  </Flex>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  bg="white"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: "black" }}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  leftIcon={<FaUser />}
                />
              </FormControl>
              <FormControl mb="8">
                <FormLabel>
                  <Flex align="center">
                    <Box as={FaEnvelope} mr="2" />
                    Email
                  </Flex>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your Email"
                  bg="white"
                  color="black"
                  border="1px solid black"
                  _placeholder={{ color: "black" }}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  leftIcon={<FaUser />}
                />
              </FormControl>

              {/* Password Field */}
              <FormControl mb="6">
                <FormLabel>
                  <Flex align="center">
                    <Box as={FaLock} mr="2" />
                    Password
                  </Flex>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    bg="white"
                    color="black"
                    border="1px solid black"
                    _placeholder={{ color: "black" }}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    leftIcon={<FaLock />}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      h="0.7rem"
                      size="sm"
                      onClick={handleShowClick}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      color="black"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl mb="6">
                <FormLabel>
                  <Flex align="center">
                    <Box as={FaLock} mr="2" />
                    Confirm Password
                  </Flex>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={"password"}
                    placeholder="Enter your password"
                    bg="white"
                    color="black"
                    border="1px solid black"
                    _placeholder={{ color: "black" }}
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    leftIcon={<FaLock />}
                  />
                  
                </InputGroup>
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" bg="black" color="white" w="100%" mt="4">
                Sign up
              </Button>
            </form>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              mt="3"
            >
              Already have an account?{" "}
              <Link color="black.500" onClick={handlelogClick}>
                Log In
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default RegistrationPage;
