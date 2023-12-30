import { useState } from "react";
import { useAuth } from "./Context";
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
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import lead from "./images/Coding-bro 1.png";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {

  const toast = useToast();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleregClick = ()=>{
    navigate("/register")
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.username.trim() === '' || formData.password.trim() === '') {
      toast({
        title: "All fields are necessary",
        status: "error",
      });
      return;
    }
    try {
      // Use the logIn function from the context
      await logIn(formData);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors
    }
  };

  return (
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
        <Box maxW="md" w="80%" p="10%" borderRadius="16px" bg="#92E3A9">
          <Heading
            as="h3"
            style={{ fontSize: "2xl" }}
            mb="6"
            color="black"
            textAlign="center"
            mt="-10%"
          >
            WELCOME BACK
          </Heading>

          <form onSubmit={handlelogin} >
            {/* Username Field */}
            <FormControl mb="4">
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

            {/* Submit Button */}
            <Button type="submit" bg="black" color="white" w="100%" mt="4">
              Login
            </Button>
          </form>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mt="3"
          >
            New to us?{" "}
            <Link color="black.500" onClick={handleregClick}>
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginComponent;
