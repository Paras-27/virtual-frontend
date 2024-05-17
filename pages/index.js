import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import EditLinks from "@/components/EditLinks";
import axios from "axios";
import UserContext from "@/context/userContext";
import Analytics from "@/components/Analytics";

const Home = () => {
  const router = useRouter();
  const { setUserData } = useContext(UserContext);
  const [tokenExists, setTokenExists] = useState(false);
  const [link, setLink] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("LinkTreeToken");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_API}/dashboard`,
          {
            tokenMail: token,
          }
        );
        const data = response.data;
        setUserData(data.userData);
        setLink(data.userData.links);
        localStorage.setItem("data", JSON.stringify(data.userData));
        setTokenExists(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  return (
    <div className="color min-h-screen">
      <Analytics link={link} />
      <div className="main-div">{tokenExists && <EditLinks />}</div>
    </div>
  );
};

export default Home;
