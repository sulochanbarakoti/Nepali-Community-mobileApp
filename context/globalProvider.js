import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          console.log(user);
          setUser(res);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <GlobalContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
    ></GlobalContext.Provider>
  );
};
