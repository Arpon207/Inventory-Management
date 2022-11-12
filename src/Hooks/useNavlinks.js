import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { auth } from "./../Firebase/firebase.init";

const useNavlinks = () => {
  const [isActive, setIsActive] = useState(false);

  const [user] = useAuthState(auth);

  const handleLogOut = () => {
    signOut(auth);
    setIsActive(false);
  };

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
              <Link onClick={() => setIsActive(false)} to="/manage-inventory">
                My Items
              </Link>
              <Link onClick={() => setIsActive(false)} to="/manage-inventory">
                Manage Items
              </Link>
              <Link
                onClick={() => setIsActive(false)}
                to="/manage-inventory/add"
              >
                Add Items
              </Link>
              <li onClick={handleLogOut}>Sign Out</li>
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
