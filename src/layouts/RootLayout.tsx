//Los layout son el contenido que se encuentran en todas las paginas con contenido dinamico 
//Como por ejemplo navbar, footer, etc

import { Outlet, useLocation } from "react-router-dom"
import { NavBar } from "../components/shared/NavBar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../home/Banner";
import { Novedades } from "../home/Novedades";

//Contenido padre que sera llamado desde el router
export const RootLayout = () => {
    //Hook para saber la ruta actual
    const{pathname} = useLocation();
    return  <div className="h-screen flex flex-col ">
            <NavBar/>
            {/*Si la ruta en la que estamos es igual a la de abajo nos procede a mostrar el contenido que nos plazca*/}
            {
                pathname === '/' && <Banner/>
            }

            {/* Contenido dinamico */}
            <main className="container my-8 flex-1">
                <Outlet/>
            </main>

            {
                pathname === '/' && <Novedades/>
            }
            <Footer/>

        </div>
  
}