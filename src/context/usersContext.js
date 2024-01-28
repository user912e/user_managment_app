import { createContext } from "react";

export const UserContext = createContext({
  users: [],
  lastId: 1,
  actions: {
    addUser: () => null,
    deleteUser: () => null,
    updateUser: () => null,
  },
});
