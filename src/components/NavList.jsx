import {navLists} from '../constants';
import React from 'react';

const NavList = () => {
    const content = navLists.map((nav, i) =>
    (
        <div key={i} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
            {nav}
        </div>
    ));
    return (
        <>
            {content}
        </>
    );
}

export default React.memo(NavList);