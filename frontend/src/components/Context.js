import React, { createContext, useContext } from 'react';
import useAuthentication from './Authentication'; // Update the import path as needed

const authContext = createContext({});

export function AuthProvider({ children }) {
  const auth = useAuthentication();
  console.log(process.env)
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
