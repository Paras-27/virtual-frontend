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

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/login/success`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("LinkTreeToken", response.data.token);

      // Redirect to dashboard or any other page after successful login
      fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenMail: localStorage.getItem("LinkTreeToken"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.userData);
          setLink(data.userData.links);
          console.log(data.userData.links);
          console.log(data.userData);
          // In your Home component or wherever you receive the userData
          localStorage.setItem("data", JSON.stringify(data.userData));

          // toast.success(data.message);
          setTokenExists(true); // Set tokenExists to true after successful login
        })
        .catch((err) => {
          console.log(err);
        });
      router.push("/");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("LinkTreeToken");
        if (token) {
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
        } else {
          // Token does not exist, handle the case accordingly
          getUser();
        }
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
