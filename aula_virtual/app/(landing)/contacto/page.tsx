import Banner from "../../../components/public/Banner";
import { st1 } from "../../../components/shared/images";
import { ContentMain } from "../../../components/public/estructura/ContentMain";
import { FormContacto } from "./@components/FormContacto";
import { ContactoMetadata } from "@/seo/ContactoMetaData";

export function generateMetadata() {
  const metadata = ContactoMetadata();
  return metadata;
}
const Contacto = () => {
  return (
    <>
      <Banner titulo="Contacto" imagen={`${st1.src}`} />
      <section className="px-8 lg:px-20">
        <ContentMain className="py-20">
          <FormContacto />
        </ContentMain>
      </section>
    </>
  );
};

export default Contacto;
