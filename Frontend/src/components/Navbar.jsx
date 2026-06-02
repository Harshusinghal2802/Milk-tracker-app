import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>
        {`
          .glass-navbar {
            background: rgba(15, 15, 15, 0.45);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: sticky;
            top: 0;
            z-index: 999;
          }

          .nav-link-custom {
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 10px;
            transition: 0.3s;
            font-weight: 500;
          }

          .nav-link-custom:hover {
            background: rgba(255,255,255,0.15);
            color: #ffc107;
          }

          .mobile-menu {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .menu-btn {
            display: none;
            border: none;
            background: transparent;
            color: white;
            font-size: 28px;
          }

          @media (max-width: 768px) {
            .mobile-menu {
              position: absolute;
              top: 75px;
              left: 0;
              width: 100%;
              background: rgba(20,20,20,0.95);
              backdrop-filter: blur(12px);
              flex-direction: column;
              padding: 20px;
              display: none;
            }

            .mobile-menu.active {
              display: flex;
            }

            .menu-btn {
              display: block;
            }
          }
        `}
      </style>

      <nav className="glass-navbar px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          
          {/* LOGO */}
          <Link
            to="/"
            className="text-warning fw-bold fs-3 text-decoration-none"
          >
            Recipe Janta
          </Link>

          {/* MENU BUTTON */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* NAV LINKS */}
          <div
            className={`mobile-menu ${
              menuOpen ? "active" : ""
            }`}
          >
            <Link
              className="nav-link-custom"
              to="/"
            >
              Home
            </Link>

            <Link
              className="nav-link-custom"
              to="/recipes"
            >
              Recipes
            </Link>

            <Link
              className="nav-link-custom"
              to="/ai-recipe"
            >
              AI Recipe
            </Link>

            {userInfo ? (
              <>
                <Link
                  className="nav-link-custom"
                  to="/create"
                >
                  Create
                </Link>

                <Link
                  className="nav-link-custom"
                  to="/my-recipes"
                >
                  My Recipes
                </Link>

                <Link
                  className="nav-link-custom"
                  to="/favorites"
                >
                  Favorites
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-warning"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="nav-link-custom"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;