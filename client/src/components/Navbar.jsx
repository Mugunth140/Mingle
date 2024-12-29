import React from 'react';
import  useWindowSize from '../store/useWindowSize';
import HamMenu from '../mobile/HamMenu';
import { Link } from 'react-router-dom';
import {useAuthStore} from '../store/useAuthStore';
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import '../sass/components/navbar.scss';

const Navbar = () => {

  const {logout, authUser} = useAuthStore();
  const {device} = useWindowSize();

  return (
    <>
    <header className='navbar-container'>
      <div className='navbar-logo'>
        <Link to='/'>
        <img src="/logo.png" alt="logo" height={28} width={28} />
        <h1 className='logo-text'>Mingle</h1>
        </Link>
      </div>
      {device === 'mobile' ? <HamMenu /> : (<div className='navbar-links' style={{ "--icon-color": "var(--neutral)" }}>
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
      </div>)
      }
    </header>
    </>
  )
}


export default Navbar
