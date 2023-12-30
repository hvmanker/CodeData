import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import axios from "axios"; // Import Axios
import { useToast } from "@chakra-ui/react";

const useAuthentication = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate from React Router
  const toast = useToast();

  const logOut = () => {
    if (isLoggedIn === false) {
      navigate("/");
      toast({
        title: "Please Login ",
      });
      return;
    }
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);

    axios
      .post(`${process.env.REACT_APP_URL}/auth/logout`)
      .then(() => {
        navigate("/");
        toast({
          title: "Logout Successful",
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Handle error
      });
  };

  // const getUser = async () => {
  //   if (!token) {
  //     navigate("/"); // Use navigate to handle navigation when the token is missing
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`/user/getuser/${userId}`, {
  //       headers: {
  //         authorization: `bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 400) {
  //       logOut();
  //     }

  //     const data = response.data;
  //     setUser(data.user);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const logIn = async (user) => {
    try {
      console.log("call sent to login", user);

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        {
          username: user.username,
          password: user.password,
        },
        { withCredentials: true }
      );

      const data = response.data;
      console.log(data)
      if (response.status === 200) {
        const jwtToken = data.token;
        setToken(jwtToken);
        localStorage.setItem("JWT-TOKEN", jwtToken);
        setUserId(data.userId);
        localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true);

        toast({
          title: "Logged In successfully",
          status: "success", // or "info"
        });

        navigate("/Welcome"); // Use navigate to change the route

        
      } else {
        toast({
          title: "Login error",
          status: "error",
        });
        return 
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      
      // Handle specific error scenarios, e.g., network error, server error, etc.
      if (axios.isAxiosError(error)) {
        toast({
          title: "Username or Password Incorrect",
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

  // useEffect(() => {
  //   const localToken = localStorage.getItem("JWT-TOKEN");
  //   const localUserId = localStorage.getItem("userId");
    
  //   if (!localToken || !localUserId) {
  //     // If localToken or localUserId is not found, allow access to "register" and "login" routes
  //     const allowedRoutes = ["/register", "/login"];
  //     const currentRoute = window.location.pathname;
  
  //     if (!allowedRoutes.includes(currentRoute)) {
  //       navigate("/login"); // Redirect to login if not on an allowed route
  //       toast({
  //         title: "Please Login",
  //         status: "info",
  //       });
  //       return;
  //     }
  
  //     return; // Prevent further execution of the useEffect
  //   }
  
  //   setToken(localToken);
  //   setUserId(localUserId);
  //   setIsLoggedIn(true);
  //   navigate("/Welcome"); // Use navigate to change the route
  // }, [navigate]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (isLoggedIn && token && userId) {
  //       await getUser();
  //     }
  //   };

  //   fetchUser().catch((err) => {
  //     navigate("/"); // Use navigate to handle navigation when an error occurs
  //     console.error("An error has occurred: ", err);
  //   });
  // }, [isLoggedIn, token, userId]);

  return {
    logIn,
    logOut,
    isLoggedIn,
    userId,
    token,
    
  };
};

export default useAuthentication;
