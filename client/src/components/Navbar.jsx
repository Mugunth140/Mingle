import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/components/navbar.scss';
import {useAuthStore} from '../store/useAuthStore';
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = () => {


  const {logout, authUser} = useAuthStore();

  return (
    <>
    <header>
      <div className='navbar-logo'>
        <Link to='/'>
        <img src="/logo.png" alt="logo" height={28} width={28} />
        <h1 className='logo-text'>Mingle</h1>
        </Link>
      </div>
      <div className='navbar-links' style={{ "--icon-color": "var(--neutral)" }}>
        <Link to='/settings'>
        <IoSettingsOutline  style={{ color: "var(--icon-color)" }} size={20} />
        <h1>settings</h1>
        </Link>
        {
          authUser && <>
            <Link to='/profile'>
               <IoPersonCircleOutline style={{ color: "var(--icon-color)" }} size={20} />
            <h1>profile</h1>
            </Link>
          
            <Link onClick={logout}>
              <MdLogout style={{ color: "var(--icon-color)" }} size={20} />
             <h1>logout</h1>
            </Link>
          </>
        }
      </div>
    </header>
    </>
  )
}

export default Navbar