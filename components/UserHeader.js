import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "../context/userContext";

const UserHeader = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("LinkTreeToken");
    router.push("/login");
  };

  const { userData, setUserData } = useContext(UserContext);
  const { avatar, handle } = userData;

  useEffect(() => {
    console.log(window.location.href);
    if (!localStorage.getItem("LinkTreeToken"))
      return (window.location.href = "/login");
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/dashboard`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error("Error happened");
        // setData(data.userData);
        console.log("logging from userHeader", data.userData);
        setUserData(data.userData);
        localStorage.setItem("userHandle", data.userData.handle);
        // toast.success(data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row p-5">
          <Link href={`https://virtualid.vercel.app/${handle}`}>
            <button className="inline-flex w-full md:w-auto px-5 py-3 text-red-500 font-bold hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4">
              <img src="/svg/user.svg" className="w-6 mr-3" />
              View Tahk-tree
            </button>
          </Link>
        </div>
        <Link href="/edit/profile">
          <div className="flex flex-row">
            <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
              <div className="text-xs md:text-md flex flex-col flex-wrap">
                <span className="font-bold">{handle}</span>
              </div>
              <div className="user-img">
                <img className="w-10 ml-5 rounded-full" src={avatar} />
              </div>
            </div>
            <img
              className="w-6 mr-5 cursor-pointer"
              src="/svg/notify.svg"
              alt=""
            />
            <img
              className="w-6 mr-5 cursor-pointer"
              src="/svg/logout.svg"
              alt=""
              onClick={handleLogout}
            />
          </div>
        </Link>
      </header>
    </>
  );
};

export default UserHeader;
