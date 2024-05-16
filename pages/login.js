import React, { useEffect, useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "@/components/Navbar";

const Apply = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginwithgoogle = (e) => {
    e.preventDefault();
    window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_URL}`;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // backend here
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("You are Logged in");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push("/");
        }
        if (data.status === "not found") {
          toast.error("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          " min-h-screen flex justify-center items-center apply"
        }
      >
        <div className="main apply-form">
          <div className="content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">
              You're now among top creators
            </h1>
            <p className="text-center">Access your Dashboard</p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                <img className="w-6 mr-2" src="/svg/email.svg" alt="" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-none w-full"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </span>
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
                value="Login"
              />
              <button
                className="login-with-google-btn"
                onClick={loginwithgoogle}
              >
                Sign In With Google
              </button>
            </form>
          </div>
          <h4 className="text-center text-white pt-3">
            New Here?{" "}
            <Link className="font-bold text-red-400" href="/apply">
              Apply
            </Link>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Apply;
