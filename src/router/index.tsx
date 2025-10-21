import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, NosotrosPage, PastelesPage } from "../pages";



export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    //Rutas hijas que vamos ir anidando
    children : [
        {
            //Toma el mismo path que el padre
            index: true,
            element: <HomePage/>,
        },
        {
            //Sin slash pq se colocan solos wey
            path: 'pasteles',
            element: <PastelesPage/>,
        },
        {
            path: 'nosotros',
            element: <NosotrosPage/>,
        }
    ]
  },
]);