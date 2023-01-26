import React, { useState, createContext } from "react";

const userState = {};

export const Context = createContext();

export default function AppStore ({ children }) {
  const [user, setUser] = useState(userState);
  return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
};