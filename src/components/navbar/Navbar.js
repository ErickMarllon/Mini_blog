import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useViewPort } from "../../hooks/useViewPort";
const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [active, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!active);
  };
  let { width } = useViewPort();
  let desktopOrMobile = 992;
  return (
    <nav
      className={
        width > desktopOrMobile ? styles.navbar_desktop : styles.navbar_mobile
      }
    >
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <span
        className={
          width > desktopOrMobile ? styles.menu_hiden : styles.menu_mobile_span
        }
        onClick={ToggleMode}
      >
        <span
          className={active !== false ? styles.menu_active : styles.menu}
        ></span>
        <ul className={active !== false ? styles.ul_active : ""}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink
                  to="/post/create"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Novo post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  DashBoard
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sobre
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/" onClick={logout}>
                Sair
              </NavLink>
            </li>
          )}
        </ul>
      </span>
    </nav>
  );
};

export default Navbar;
