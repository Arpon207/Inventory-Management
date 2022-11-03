import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { auth } from "./../Firebase/firebase.init";

const useNavlinks = () => {
  const [isActive, setIsActive] = useState(false);

  const [user] = useAuthState(auth);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Manage Inventory",
      path: "manage-inventory",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
    {
      div: user ? (
        <div className="user">
          <p onClick={() => setIsActive((prev) => !prev)}>
            User{" "}
            <MdKeyboardArrowDown
              className={isActive ? "arrow-down" : "arrow-up"}
            />
          </p>
          {isActive ? (
            <ul>
              <li>My Items</li>
              <li>Manage Items</li>
              <li>Add Items</li>
              <li
                onClick={() => {
                  signOut(auth);
                  setIsActive(false);
                }}
              >
                Sign Out
              </li>
            </ul>
          ) : undefined}
        </div>
      ) : (
        <NavLink
          to={"/signin"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Signin
        </NavLink>
      ),
    },
  ];
  return { links };
};

export default useNavlinks;
