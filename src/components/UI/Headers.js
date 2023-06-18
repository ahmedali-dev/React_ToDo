import React from "react";
import css from "./styles.module.scss";
import logo from "../icons/Logo.png";
import { Close, Search } from "../icons/icons";
import Input from "./Input";

const Headers = ({ name, GetSearchValue }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  const searchHanlde = (e) => {
    const value = e.target.value;
    GetSearchValue(value);
  };

  return (
    <div className={`${css.headers} ${searchOpen && css.headersSearch}`}>
      <div className={css.headers_logo}>
        <div
          className={css.headers_logo_logo}
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <div className={css.headers_logo_name}>{name}</div>
      </div>

      <div className={css.headers_search}>
        <div
          className={css.headers_search_logo}
          onClick={() => {
            setTimeout(() => searchRef.current.focus(), 100);
            setSearchOpen(true);
          }}
        >
          <Search />
        </div>
        <div className={css.headers_search_form}>
          <Input
            ref={searchRef}
            classname={css.formGroup}
            type="text"
            placeholder="Search"
            name={"search"}
            onChange={searchHanlde}
          />
          <div
            className={css.closeForm}
            onClick={() => {
              setSearchOpen(false);
              searchRef.current.value = "";
            }}
          >
            <Close />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
