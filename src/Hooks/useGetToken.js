import { useState, useEffect } from "react";
import axios from "axios";

const useGetToken = (user) => {
  const [token, setToken] = useState([]);
  console.log(user?.user.email);
  useEffect(() => {
    const getToken = async () => {
      if (user.user.email) {
        const { data } = await axios.post(
          "http://localhost:5000/inventory/token/",
          { email: user.user.email }
        );
        setToken(data);
        localStorage.setItem("accessToken", data);
      }
    };
    getToken();
  }, [user]);
  return [token, setToken];
};

export default useGetToken;
