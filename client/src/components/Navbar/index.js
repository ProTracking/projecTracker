import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./Navbar";
import { Button } from "semantic-ui-react";
import { auth } from "../../config/firebase-config";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/page_1">Events</NavLink>
          <NavLink to="/page_2">Annual Report</NavLink>
          <NavLink to="/page_3">Teams</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
        </NavMenu>
        <NavBtn>
          <div className="loggedIn-wrapper">
            <div>
              <Button onClick={() => auth.signOut()} color="yellow">
                Log out
              </Button>
            </div>
          </div>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
