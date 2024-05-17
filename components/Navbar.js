import UserContext from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  // const [handle, setHandle] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout?");
    if (confirmDelete) {
      localStorage.removeItem("LinkTreeToken");
      setUser(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    const tokenv = localStorage.getItem("LinkTreeToken");
    if (tokenv) {
      setUser(true);
    }
  }, [userData]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("data");
    if (!userData || !userData.avatar) {
      const localUserData = JSON.parse(storedUserData);
      setUserData(localUserData);
      // Now you can use the userData object
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <nav className="navbar shadow-md mb-1">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.png"
              className="h-8 mr-3 rounded-3xl"
              alt="Company Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Tree and Human Knot
            </span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              mobileMenuOpen ? "" : "hidden"
            } w-full md:block md:w-auto focus:outline-none`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              {user ? (
                <li className="flex flex-col md:flex-row">
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 mr-2"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_FRONT_URL}${userData.handle}`}
                    className="block py-2 pl-3 pr-3  text-gray-900 rounded md:hover:bg-transparent md:border-0  md:dark:hover:bg-transparent"
                  >
                    Appearance
                  </Link>
                  <Link
                    href="/profile"
                    className="py-2 pl-2 pr-4 mr-2 text-gray-900 rounded md:hover:bg-transparent md:border-0  md:dark:hover:bg-transparent flex items-center relative bottom-1"
                  >
                    <img
                      referrerpolicy="no-referrer"
                      className="w-8 md:ml-5 mr-2 rounded-full"
                      src={userData.avatar}
                    />
                    <p>{userData.handle ? userData.handle : "No User"}</p>
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="block py-2 pl-3 pr-4 mr-2 text-gray-900 rounded md:hover:bg-transparent md:border-0  md:dark:hover:bg-transparent cursor-pointer"
                  >
                    Logout
                  </p>
                </li>
              ) : (
                <li className="flex flex-row">
                  <Link href="/apply" className="block py-2 pl-3 pr-4 mr-8">
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="block py-2 pl-3 pr-4"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
