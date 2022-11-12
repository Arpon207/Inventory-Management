import { useState, useEffect } from "react";
import axios from "axios";

const useGetToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    if (email) {
      const getToken = async () => {
        const { data } = await axios.post(
          "https://inventory-management207.herokuapp.com/inventory/token/",
          { email: email }
        );
        setToken(data);
        localStorage.setItem("accessToken", data);
      };
      getToken();
    }
  }, [user]);
  return [token, setToken];
};

export default useGetToken;
