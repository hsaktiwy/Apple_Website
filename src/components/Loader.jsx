import { Html } from "@react-three/drei";
import React from "react";
const Loader = () => {
    return (
        <Html>
            <div className='absolute w-full h-full left-0 top-0 flex-center'>
                <div className="rounded-full border-t-4 border-blue animate-spin">
                    <div className="w-[10vw] h-[10vw]">

                    </div>
                </div>
            </div>
        </Html>
    );
}

export default React.memo(Loader);