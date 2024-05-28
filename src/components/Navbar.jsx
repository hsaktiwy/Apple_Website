import { appleImg, bagImg, searchImg } from "../utils";
import {navLists} from '../constants';
// import { useState } from "react";
const Navbar = () => {
    // const [display, setDisplay] = useState(false)

    const content = navLists.map((nav, i) =>
    (
        <div key={i} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
            {nav}
        </div>
    ));
    return (
        <>

        <div className='Navbar'>
            <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
                <nav className="flex w-full screen-max-width">
                    <img src={appleImg} alt="Apple" width={14} height={18}/>
                    <div className="flex flex-1 justify-center max-sm:hidden">
                        {content}
                    </div>
                    <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                        <img src={searchImg} alt="search" width={18} height={18}/>
                        <img src={bagImg} alt="bag" width={18} height={18}/>
                    </div>
                </nav>
            </header>
        </div>

        {/* {
            display && <div className="fixed top-0 left-0 right-0 bottom-0 bg-green-500 ">

            </div>
        } */}
        </>
    );
}

export default Navbar;