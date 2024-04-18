import React, { createContext } from "react";
import { useState } from "react";
export const Users = createContext();
function DataProvider({ children }) {
  const [userData, setUserData] = useState();

  return (
    <>
      <Users.Provider
        value={{
          userData,
          setUserData,
        }}
      >
        {children}
      </Users.Provider>
    </>
  );
}

export default DataProvider;
