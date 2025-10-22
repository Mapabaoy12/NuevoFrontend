import { MdLocalShipping } from "react-icons/md"

export const Destacadas = () => {
    return (<div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
        <div className="flex items-center gap-6">
            <MdLocalShipping scale={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold">
                    Envio gratis
                </p>
                <p className="text-sm">
                    En todo producto
                </p>                
            </div>    
        </div>
        <div className="flex items-center gap-6">
            <MdLocalShipping scale={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold">
                    Envio gratis
                </p>
                <p className="text-sm">
                    En todo producto
                </p>                
            </div>    
        </div><div className="flex items-center gap-6">
            <MdLocalShipping scale={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold">
                    Envio gratis
                </p>
                <p className="text-sm">
                    En todo producto
                </p>                
            </div>
        </div>
        <div className="flex items-center gap-6">
            <MdLocalShipping scale={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold">
                    Envio gratis
                </p>
                <p className="text-sm">
                    En todo producto
                </p>                
            </div>    
        </div>
        

        
            
    </div>)
}