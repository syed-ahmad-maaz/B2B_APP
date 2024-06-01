import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./components/Admin/SideBar/Sidebar";
import "./Nav.css";
import { IconContext } from "react-icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
const Nav = () => {
  function logout(params) {
    localStorage.clear();
    // window.localStorage.removeItem("isloggedin");
    window.location.href = "/";
  }
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        {localStorage.getItem("DistributorToken") ? (
          <></>
        ) : (
          <>
            <div className="navbar">
           
              <Link to="#" className="menu-bars">
                {localStorage.getItem("admintoken") ? (
                  <>
                    <FaIcons.FaBars onClick={showSidebar} className="runaway" />

                    <b className="pti">Dashboard</b>

                    <ExitToAppTwoToneIcon
                      style={{ fontSize: '2.25rem' }}
                        className="logout-icon"
                      onClick={logout}
                    ></ExitToAppTwoToneIcon>
                  </>
                ) : (
                  <></>
                )}
              </Link>
            </div>
          </>
        )}

        {localStorage.getItem("admintoken") ? (
          <>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <Scrollbars style={{ height: 590 }}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                  <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Scrollbars>
            </nav>
          </>
        ) : (
          <></>
        )}
      </IconContext.Provider>
    </>
  );
};

export default Nav;
