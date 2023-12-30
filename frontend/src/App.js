import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Welcome from "./components/Welcome";
import LoginComponent from "./components/LoginComponent";
import RegistrationPage from "./components/Registeration";
import QuestionList from "./components/questions/Questionscard";
import UserPage from "./components/UserPage";
import UnderDevelopment from "./components/UnderDev";
import QuestionCard from "./components/questions/QuestionInCard";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/questions/:category" element={<QuestionList />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/underdev" element={<UnderDevelopment />} />
        </Routes>
        {/* <UserPage></UserPage> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
