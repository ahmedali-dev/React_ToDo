import React, { useContext } from "react";
import css from "./../assets/Navbar.module.scss";
import Logo from "../components/icons/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { CollSvg, Note, Profile } from "../components/icons/icons";
import authContext from "../Store/Auth-context";
import { useJwt } from "react-jwt";

const Navbar = () => {
  const ctx = useContext(authContext);
  const { isExpired } = useJwt(ctx.token);
  if (isExpired) return ctx.logout();
  return (
    <header className={css.header}>
      <nav className={css.header_nav}>
        <div className={css.header_nav_logo}>
          <Link to={"/"}>
            <img src={Logo} alt={"website logo"} />
            <h3>CateNote</h3>
          </Link>
        </div>
        <div className={css.header_nav_content}>
          <div className={css.header_nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.header_nav_content_item_linkActive : null;
              }}
              to={"/lists"}
            >
              <CollSvg />
              <span>Lists</span>
            </NavLink>
          </div>

          <div className={css.header_nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.header_nav_content_item_linkActive : null;
              }}
              to={"/notes"}
            >
              <Note />
              <span>Notes</span>
            </NavLink>
          </div>

          {/* <div className={css.header_nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.header_nav_content_item_linkActive : null;
              }}
            >
              <Add />
              <span>Notes</span>
            </NavLink>
          </div> */}

          <div className={css.header_nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.header_nav_content_item_linkActive : null;
              }}
              to={"/account"}
            >
              <Profile />
              <span>Profile</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
