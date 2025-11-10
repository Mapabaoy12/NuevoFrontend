//Los layout son el contenido que se encuentran en todas las paginas con contenido dinamico 
//Como por ejemplo navbar, footer, etc

import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/shared/NavBar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/home/Banner";
import { Novedades } from "../components/home/Novedades";

//Contenido padre que sera llamado desde el router
export const RootLayout = () => {
    // Hook para saber la ruta actual
    const { pathname } = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            {/* NavBar que cubrira toda la parte de arribita */}
            <NavBar />

            {/* Container centralizado */}
            <div className="container mx-auto px-4 flex-1">
                {/* Si la ruta en la que estamos es igual a la de abajo nos procede a mostrar el contenido que nos plazca */}
                {pathname === '/' && <Banner />}

                {/* Contenido dinamico */}
                <main className="my-8">
                    <Outlet />
                </main>

                {pathname === '/' && <Novedades />}
            </div>

            {/* Footer que ocupara toda la parte de abajito */}
            <Footer />
        </div>
    );
};