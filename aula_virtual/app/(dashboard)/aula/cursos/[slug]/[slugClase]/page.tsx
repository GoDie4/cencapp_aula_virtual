/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { ReproductorClase } from "./@components/ReproductorClase";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../../../components/navigation/Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../public/components/shadcdn/Accordion";
import { clases } from "../page";
import CommentComponent from "./@components/ComentariosClase";
const Page: NextPage = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-4/5">
            <div className="w-full rounded-main overflow-hidden">
              <ReproductorClase />
            </div>
            <div className="w-full  px-1 md:px-3 py-5 lg:p-5">
              <div className="w-full flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full flex items center gap-3">
                  <div className="w-fit">
                    <img
                      src="/assets/images/cursos/1.webp"
                      alt=""
                      className="w-16 h-16 rounded-lg overflow-hidden"
                    />
                  </div>
                  <div className="w-fit flex flex-col justify-center">
                    <h5 className="font-semibold text-lg text-black-900">
                      Topografía en obras civiles
                    </h5>
                    <p className="text-black-700 text-sm">
                      Por <span>Logos Perú</span>
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-fit mt-5 md:mt-0 flex justify-between items-center gap-3">
                  <p className="font-medium text-black-900  text-lg ">
                    Clase 1 de 48
                  </p>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      type="button"
                      className="flex p-2 sm:p-3 border-2 cursor-pointer text-primary-main rounded-main border-primary-main text-2xl transition-all duration-200 hover:bg-primary-main hover:text-white-main"
                    >
                      <MdSkipPrevious />
                    </button>
                    <button
                      type="button"
                      className="flex p-2 sm:p-3 border-2 cursor-pointer text-primary-main rounded-main border-primary-main text-2xl transition-all duration-200 hover:bg-primary-main hover:text-white-main"
                    >
                      <MdSkipNext />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-3 lg:px-5 py-3 flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-950">
                Introducción a la topografía
              </h2>
            </div>
            <div className="w-full">
              <Tabs>
                <TabTitle title="Materiales" className="text-lg md:text-xl "/>
                <TabContent>
                  <div>
                    <p>Materiales para esta clase.</p>
                  </div>
                </TabContent>

                <TabTitle title="Clases" className=" text-lg md:text-xl "/>
                <TabContent>
                  <Accordion type="single" collapsible className="w-full">
                    {clases.map((clase) => (
                      <AccordionItem key={clase.id} value={clase.id}>
                        <AccordionTrigger className="bg-primary-900 justify-end mb-0.5 px-4 flex-row-reverse py-3 text-white-main rounded-t-main text-lg w-full">
                          {clase.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc  space-y-2 py-3 px-5 pl-8  text-base">
                            {clase.content.map((item, index) => (
                              <li key={index} className="flex justify-between">
                                <span>{item.topic}</span>
                                <span className="text-sm text-gray-500">
                                  {item.duration} min
                                </span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabContent>
              </Tabs>
            </div>
          </div>
          <div className="w-full lg:w-1/5">
            <CommentComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
