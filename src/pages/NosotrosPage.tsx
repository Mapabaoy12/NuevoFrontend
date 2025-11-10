import { AboutUs } from "../components/about/AboutUs";
import { AboutContent } from "../components/about/AboutContent";
import { ContactInfo } from "../components/about/ContactInfo";

export const NosotrosPage = () => {
    const paragraphs = [
        "En Pastelería Mil Sabores creemos que cada momento especial merece un sabor único. Desde nuestros inicios, nos hemos dedicado a elaborar productos artesanales combinando recetas tradicionales con un toque de innovación, para ofrecer experiencias dulces que enamoran a cada paladar.Nuestro compromiso es con la calidad, frescura y dedicación en cada preparación. Utilizamos ingredientes seleccionados cuidadosamente, priorizando productos naturales y locales, para garantizar que cada bocado sea una verdadera celebración del sabor.",
        "Contamos con un equipo apasionado por la repostería, que trabaja día a día con creatividad y amor por lo que hace. Ya sea para un cumpleaños, una boda, una reunión familiar o simplemente para disfrutar un antojo, en Mil Sabores encontrarás el postre perfecto para cada ocasión.Porque para nosotros, cada pastel cuenta una historia, y queremos ser parte de la tuya."
    ];

    return (
        <div className="space-y-5">
            <AboutUs 
                title="Nuestra Pasteleria" 
                imageUrl="https://peruretail.sfo3.cdn.digitaloceanspaces.com/wp-content/uploads/Postres.png" 
            />
            <AboutContent 
                paragraphs={paragraphs} 
                sectionTitle="Pasteles hechos con amor" 
            />
            <ContactInfo 
                email="pasteleria@pasteleriamilsabores.com" 
                phone="+56 9 91537604" 
                introText="Para mas informacion contactenos" 
            />
        </div>
    );
};