import NavBar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

const profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [handle, setHandle] = useState("");
  const [avatar, setAvatar] = useState("");
  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  });

  const handleSocial = (e) => {
    setSocial({
      ...social,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
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
        if (data.status === "error") return toast.error("Error happened");
        setName(data.userData.name);
        setAvatar(data.userData.avatar);
        setHandle(data.userData.handle);
        setBio(data.userData.bio);
        setSocial(data.userData.socials);
        // toast.success(data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveProfile = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/save/profile`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        name: name,
        bio: bio,
        avatar: avatar,
        handle: handle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          if (data.message === "Handle already taken") {
            toast.error(
              "This handle is already taken. Please choose a different one."
            );
          } else {
            toast.error(data.error);
          }
        } else {
          toast.success("Profile saved successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while saving the profile");
      });
  };

  const saveSocials = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/save/socials`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        socials: social,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "error") return toast.error(data.error);
        toast.success("Socials saved successfully");
      });
  };

  return (
    <div className="color">
      <NavBar />
      <div>
        <main>
          <section>
            <div>
              <h4 className="font-bold text-center text-xl mb-8 mt-8">
                Edit profile
              </h4>
              <div>
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/user.svg" alt="" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Set a Name"
                      required
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter a unique handle name"
                      required
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter a bio"
                      required
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/user.svg" alt="" />
                    <input
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Image link"
                      required
                    />
                    <img
                      className="w-10 rounded-full border-2 border-white shadow-md"
                      src={avatar}
                    />
                  </span>
                  <input
                    className="bg-blue-500 w-32 md:w-96 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                    type="submit"
                    value="Save profile"
                  />
                </form>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="font-bold text-center text-xl mb-5">
                Edit Socials
              </h4>
              <div>
                <form
                  onSubmit={saveSocials}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/fb.svg" alt="" />
                    <input
                      id="facebook"
                      value={social.facebook}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Facebook ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/ig.svg" alt="" />
                    <input
                      id="instagram"
                      value={social.instagram}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Instagram ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/twt.svg" alt="" />
                    <input
                      id="twitter"
                      value={social.twitter}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Twitter ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/lnkd.svg" alt="" />
                    <input
                      id="linkedin"
                      value={social.linkedin}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Linkedin ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/github.svg" alt="" />
                    <input
                      id="github"
                      value={social.github}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter Github ID"
                    />
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none bg-white">
                    <img className="w-6 mr-2" src="/svg/yt.svg" alt="" />
                    <input
                      id="youtube"
                      value={social.youtube}
                      onChange={handleSocial}
                      className="focus:outline-none w-full"
                      type="text"
                      placeholder="Enter YouTube ID @"
                    />
                  </span>
                  <input
                    className="bg-blue-500 w-32 md:w-96 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer mb-10 text-white"
                    type="submit"
                    value="Save socials"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default profile;
