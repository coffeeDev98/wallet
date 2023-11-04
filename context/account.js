import React from "react";

export const AccountContext = React.createContext({
  account: null,
  setAccount: () => {},
  seedPhrase: "",
  setSeedPhrase: () => {},
});
