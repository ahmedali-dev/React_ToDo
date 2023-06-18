import React, { useContext } from "react";
import css from "./Navbar.module.scss";
import appicon from "./../components/icons/appicon.mp4";
import { NavLink } from "react-router-dom";
import { CollSvg, Note } from "../components/icons/icons";
import authContext from "../Store/Auth-context";

const Navbar = () => {
  const ctx = useContext(authContext);
  console.log(ctx.image);
  return (
    <>
      <nav className={css.nav}>
        <div className={css.nav_logo}>
          <div className={css.nav_logo_icon}>
            <video
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline
              className={css.nav_logo_icon_video}
            >
              <source src={appicon} />
            </video>
          </div>
        </div>
        <div className={css.nav_content}>
          <div className={css.nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.nav_content_item_linkActive : null;
              }}
              to={"/lists"}
            >
              <CollSvg />
              <span>Lists</span>
            </NavLink>
          </div>

          <div className={css.nav_content_item}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? css.nav_content_item_linkActive : null;
              }}
              to={"/notes"}
            >
              <Note />
              <span>Notes</span>
            </NavLink>
          </div>

          <div className={css.nav_content_item}>
            <NavLink to={"/account"}>
              <span
                className={css.user}
                style={{
                  backgroundImage: `url('${ctx.image}')`,
                  background: "blue",
                }}
              ></span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
