import { UserContext } from "../context/usersContext";
import { useEffect, useRef, useState } from "react";
import Nav from "./nav";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../hocks/useLocalStorage";

const Layout = () => {
  const [users, setUser] = useState([
    // { id: 1126103, name: "mohamed", country: "Moroco" },
    // { id: 1026003, name: "abdo", country: "Moroco" },
  ]);
  const lastId = useRef(1);
  const rank = lastId.current;
  const [savedUsers, setSavedUsers] = useLocalStorage("users");
  const [savedIndex, setSavedIndex] = useLocalStorage("lastIndex");

  useEffect(() => {
    setUser(savedUsers || []); 
    lastId.current = savedIndex || rank;
  }, []);

  useEffect(() => {
    setSavedUsers(users);
  }, [users, setSavedUsers]);

  useEffect(() => {
    setSavedIndex(lastId.current);
  }, [rank, setSavedIndex]);

  const addUser = (usr) => {
    usr = { ...usr, rank };
    setUser((prevUsers) => [...prevUsers, usr]);
  };

  const updateUser = (usr) => {
    setUser((prevUsers) => [
      ...prevUsers.map((u) => {
        if (u.id.toString() !== usr.id.toString()) return u;
        return { ...u, name: usr.name, country: usr.country };
      }),
    ]);
  };

  const deleteUser = (id) => {
    setUser((prevUsers) => [
      ...prevUsers.filter((u) => u.id.toString() !== id.toString()),
    ]);
  };

  // update rank
  const updateLastId = (v) => {
    lastId.current += v;
  };
  return (
    <div className="container py-5  min-vh-100">
      <UserContext.Provider
        value={{
          users,
          updateLastId,
          actions: { addUser, deleteUser, updateUser },
          rank,
        }}
      >
        <Nav />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
};

export default Layout;
