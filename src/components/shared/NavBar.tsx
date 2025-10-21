
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { CgMenuCake } from 'react-icons/cg';

export const NavBar = () =>{
    return ( 
    <header className='bg-yellow-600 text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
        {/*Logo*/}
        <Logo/>


        <nav className="space-x-5">
            {
                navbarLinks.map(link => (
                    <NavLink
                        key = {link.id}
                        to={link.href}
                        className={({isActive}) => `${isActive ? 'text-white underline' : ''} transition-all duration-300 font-medium hover:text-rose-300 hover:underline`}
                    >
                        {link.title}
                    </NavLink>
                ))
            }
        </nav>

        <div className="flex gap-5 items-center">
            <button>
                <HiOutlineSearch size={25}/>
            </button>

            <div className="relative">
                {/*Usuario nav */}
                <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">
                    R
                </Link>
            </div>
            <button className="relative">
                <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
                    0
                </span>
                <CgMenuCake size={25}/>
            </button>
        </div>

        <button className="md:hidden">
            <FaBarsStaggered size={25}/>
        </button>
    </header>
    )
};

  