import { appleImg, bagImg, searchImg } from "../utils";
import {navLists} from '../constants';
import React from "react";
import NavList from "./NavList";

const Navbar = () => {
    return (
        <div className='Navbar'>
            <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
                <nav className="flex w-full screen-max-width">
                    <img src={appleImg} alt="Apple" width={14} height={18}/>
                    <div className="flex flex-1 justify-center max-sm:hidden">
                        <NavList/>
                    </div>
                    <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                        <img src={searchImg} alt="search" width={18} height={18}/>
                        <img src={bagImg} alt="bag" width={18} height={18}/>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default React.memo(Navbar);