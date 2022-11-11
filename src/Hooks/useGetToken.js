import { useState, useEffect } from "react";
import axios from "axios";

const useGetToken = (user) => {
  const [token, setToken] = useState([]);
  const email = user?.user?.email;
  useEffect(() => {
    if (email) {
      const getToken = async () => {
        const { data } = await axios.post(
          "http://localhost:5000/inventory/token/",
          { email: email }
        );
        setToken(data);
        localStorage.setItem("accessToken", data);
      };
      getToken();
    }
  }, [email]);
  return [token, setToken];
};

export default useGetToken;
