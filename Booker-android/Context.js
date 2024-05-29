import React, { createContext, useState } from "react";
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [cart, setcart] = useState([]);
  return (
    <UserContext.Provider
      value={{
        carts: [cart, setcart],
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
