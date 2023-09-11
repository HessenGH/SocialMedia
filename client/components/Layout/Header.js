import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
const Header = () => {
  const [state, setState] = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    process.browser && setCurrentTab(window.location.pathname);
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link href="/" className="navbar-brand">
            TECHINFO YT
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${currentTab === "/" && "active"}`}
                    aria-current="page">
                    Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about"  className={`nav-link ${
                      currentTab === "/about" && "active"
                    }`}
                    aria-current="page">
                    About
                </Link>
              </li>
              {state !== null ? (
                <>
                  <li className="nav-item">
                    <Link href="/user/dashboard" className={`nav-link ${
                          currentTab === "/user/dashborad" && "active"
                        }`}
                        aria-current="page">
                        Dashboard
                    </Link>
                  </li>
                  <li className="nav-item"
                      aria-current="page"
                      onClick={handleLogout}>
                      Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/register"  className={`nav-link ${
                          currentTab === "/register" && "active"
                        }`}
                        aria-current="page">
                        Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/login"  className={`nav-link ${
                          currentTab === "/login" && "active"
                        }`}
                        aria-current="page">
                        Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;