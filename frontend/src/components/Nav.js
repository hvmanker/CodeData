import {
  Box,
  Flex,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import user from "./images/user.svg";
import { useAuth } from "./Context";
import { useNavigate } from "react-router-dom";
// ... (imports remain unchanged)

export default function Nav() {
  const Navigate = useNavigate()
  const { logOut } = useAuth();
  const handleCodeDataClick = (event) => {
    event.preventDefault();
    Navigate('/Welcome')
  };
  const handleProfile = (event) => {
    event.preventDefault();
    Navigate('/Profile')
  };
  return (
    <Flex
      p="4"
      bg="#92E3A9"
      color="black"
      align="center"
      justify="space-between"
    >
      {/* Left Section */}
      <Box>
      <Link href="/Welcome" fontSize="xl" fontWeight="bold" onClick={handleCodeDataClick}>
          Code Data
        </Link>
      </Box>

      {/* Right Section */}
      <Box>
        <Menu>
          <MenuButton>
            <Image
              src={user}
              alt="User Icon"
              boxSize="32px"
              borderRadius="50%"
            />
          </MenuButton>
          <MenuList
           bg="white" // Set background color to white
           
           >
            <MenuItem onClick={handleProfile} bg="white" color="black">User Profile</MenuItem>
            <MenuItem onClick={logOut} bg="white" color="black">Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
