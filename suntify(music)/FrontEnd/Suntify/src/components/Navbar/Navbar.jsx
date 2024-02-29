import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut   , IoIosHome ,IoMdLogIn } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { userContext } from "../../context/UserProvider";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import "./NavBar.css"

export default function Navbar() {
  const { user , userIn, logOut } = useContext(userContext);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
  <>
    <nav className="NavBar">
      {!userIn?(
        <>
          <Link to="/Home">Home</Link>
          <Link to="/">Auth</Link>
        </>
      ) : (
        <>
          {/* <Link to="/pay">pay</Link> */}
          <img src={user.profileImg} alt="" />
          <Link to="/">Home</Link>
          {user.artist ? <Link to="/Artist">Artist</Link> : null}
          <div id="iconsNav">
          <Link to="/Search"><CiSearch id="logOutButton"/></Link>
          <Link to="/Profile"><CgProfile id="logOutButton"/></Link>
          <Link to="/Auth"><IoIosLogOut onClick={logOut} id="logOutButton" /></Link>
          </div>
        </>
      )}
    </nav>
    <div className='Sidenavbar'>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          {!sidebar?<FaIcons.FaBars onClick={showSidebar} />:null}
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {!userIn ? (
            <>
              <li><Link to="/Home" className="sideBarButtons"><IoIosHome/></Link></li>
              <li><Link to="/" className="sideBarButtons"><IoMdLogIn/></Link></li>
            </>
          ) : (
            <>
              <img src={user.profileImg} alt="" />
              <li><Link to="/" className="sideBarButtons"><IoIosHome/></Link></li>
              {user.artist && <li><Link to="/Artist" className="sideBarButtons"><MdLibraryMusic/></Link></li>}
              <li><Link to="/Search" className="sideBarButtons"><CiSearch  /></Link></li>
              <li><Link to="/Profile" className="sideBarButtons"><CgProfile/></Link></li>
              <li><Link to="/Auth" onClick={logOut}><IoIosLogOut className="sideBarButtons"/></Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
   </>
  );
}
