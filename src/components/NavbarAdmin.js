import React from 'react'
import { BiHomeAlt, BiSolidLogOutCircle } from "react-icons/bi";
import { useRecoilState } from 'recoil';
import { authenticated } from '../store';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NavbarAdmin = () => {
  const [auth, setAuth] = useRecoilState(authenticated)
  const logout = async () => {
    await axios.post('logout')
    setAuth({ check: false })
    localStorage.removeItem('tokenUser')
  }
  return (
      <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
        <div className="container mx-auto">
          <div className="w-full bg-black/20 h-[96px] backdrop-blur-2xl rounded-full max-w-[200px] mx-auto px-5 flex justify-between items-center text-2xl text-white/50">
            <Link
              to="home"
              activeClass="active"
              smooth={true}
              spy={true}
              offset={-200}
              className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
            >
              <BiHomeAlt />
            </Link>
            <button
              onClick={logout}
              className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
            >
              <BiSolidLogOutCircle />
            </button>
          </div>
        </div>
      </nav>
  )
}

export default NavbarAdmin