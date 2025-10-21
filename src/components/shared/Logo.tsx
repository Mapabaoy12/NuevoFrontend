import { Link } from "react-router-dom";
import { LuCakeSlice } from 'react-icons/lu';

export const Logo = () => {
    return (
        <Link to='/' className={`text-2x1 font-bold tracking-tigher transition-all`}>
            <p className="hidden lg:block">
                PasteleriaMilSabores
                <span className="text-cyan-600"></span>
            </p>

            <p className="flex text-4x1 lg:hidden">
                <span ><LuCakeSlice size={40}/></span>
                
            </p>
        </Link>

    )

}