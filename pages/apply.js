import React, { useEffect, useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "@/components/Navbar";

const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // backend part
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        handle,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast("You are registered successfully");
          localStorage.setItem("LinkTreeToken", data.token);
          setSubmitted(true);
          router.push("/login");
        } else if (
          data.status === "error" &&
          data.message === "Try different email or username"
        ) {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error("Try a different username");
      });
  };

  const loginWithGoogle = (e) => {
    e.preventDefault();
    window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_URL}`;
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
          styles.background + " min-h-screen flex justify-center apply"
        }
      >
        <div className="main mt-20 apply-form">
          <div className="content bg-white border-2 px-4 py-4 rounded-2xl shadow-lg">
            <h1 className="text-xl font-bold text-center">
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
              <button
                className="login-with-google-btn"
                onClick={loginWithGoogle}
              >
                Sign up with Google
              </button>
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
