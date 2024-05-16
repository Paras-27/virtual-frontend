import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinkTree from "../components/LinkTree";
import Link from "next/link";
import ShareButton from "../components/ShareButton";
import SocialTree from "@/components/SocialTree";

const Handle = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [userFound, setUserFound] = useState(null); // Initialize as null

  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    if (router.query?.handle) {
      fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/${router.query.handle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error") return toast.error(data.error);
          if (data.status === "success") {
            setData(data.userData);
            setUserFound(true);
            setSocial(data.socials);
          }
        })
        .catch((err) => {
          console.log(err);
          setUserFound(false); // Set userFound to false on error
        });
    }
  }, [router.query]);

  if (userFound === null) {
    return null; // Render nothing while waiting for userFound state
  }

  if (!userFound) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="not-found px-3 ">
          <h1 className="font-bold text-lg">User Not found 🙁</h1>
          <p>
            If you're looking for a page, double check the spelling in your
            profile section.
          </p>
          Create your own
          <Link
            className="bg-indigo-600 px-2 ml-2 text-white hover:bg-indigo-400 transition-all duration-500"
            href="/apply"
          >
            {" "}
            virtual id
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-link min-h-screen appearance">
      <LinkTree data={data} />
      <ShareButton />
      <SocialTree social={social} />
    </div>
  );
};

export default Handle;
