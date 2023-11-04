import { createContext } from "react";

export const GlobalContext = createContext({
  screen: null,
  setScreen: () => {},
});
