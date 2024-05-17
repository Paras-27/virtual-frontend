import React, { useEffect, useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const image = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

  const handleRegister = (e) => {
    e.preventDefault();
    // backend part
    const name = "";
    const avatar = image;
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        name,
        avatar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("You are registered successfully");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push("/");
        } else if (
          data.status === "error" &&
          data.message === "Try different email or handle"
        ) {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error("Try a different username");
      });
  };

  const handleGoogleLogin = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    const email = details.email;
    const password = details.sub;
    const name = details.name;
    const handle = generateUniqueHandleName(name);
    const avatar = details.picture ? details.picture : image;
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        name,
        avatar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("You are registered successfully");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push("/");
        } else if (
          data.status === "error" &&
          data.message === "Try different email or handle"
        ) {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error("Try a different username");
      });
  };

  const generateUniqueHandleName = (displayName) => {
    const cleanName = displayName.replace(/\W+/g, "");
    const timestamp = String(new Date().getTime()).slice(-5);
    return `${cleanName}_${timestamp}`;
  };

  useEffect(() => {
    if (localStorage.getItem("LinkTreeToken")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <section
        className={
          styles.background +
          " min-h-screen flex items-center justify-center apply"
        }
      >
        <div className="main apply-form">
          <div className="content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">
              Create Your Personal Virtual Id
            </h1>

            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-4 text-md mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                <img className="w-6 mr-2" src="/svg/ig.svg" alt="" />
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="focus:outline-none"
                  type="text"
                  placeholder="Enter Username"
                  required
                />
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="email"
                placeholder="Enter your email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="password"
                placeholder="Set a password"
                required
              />
              <input
                className="bg-indigo-600 text-white py-2 rounded-3xl cursor-pointer"
                type="submit"
                value="Apply"
              />
              <div className="login-with-google-btn">
                <GoogleOAuthProvider
                  clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    theme="filled_blue"
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </form>
          </div>
          <h4 className="text-center text-white pt-3">
            Already have an account?{" "}
            <Link className="font-bold text-red-400" href="/login">
              Login
            </Link>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Apply;
