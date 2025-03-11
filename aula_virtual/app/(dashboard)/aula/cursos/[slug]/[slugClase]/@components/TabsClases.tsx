"use client";
import React, { useState } from "react";
import Tabs, {
  TabContent,
  TabTitle,
} from "../../../../../../../components/navigation/Tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../../public/components/shadcdn/Accordion";
import { Clase, Seccion } from "../../../@interfaces/InterfacesCurso";
import axios from "axios";
import { config } from "@/config/config";

export const TabsClases = ({ dataClase }: { dataClase: Clase }) => {
  const [clases, setClases] = useState<Clase[]>([]);

  const traerClases = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/clasesPorCurso/${dataClase.seccion.cursoId}`
      );

      setClases(response.data.clases);

      console.log(response.data.clases);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <Tabs>
        <TabTitle title="Materiales" className="text-lg md:text-xl " />
        <TabContent>
          <div>
            <p>Materiales para esta clase.</p>
          </div>
        </TabContent>

        <TabTitle
          title="Clases"
          className=" text-lg md:text-xl "
          onClick={() => {
            traerClases();
          }}
        />
        <TabContent>
          <Accordion type="single" collapsible className="w-full">
            {clases[0]?.Seccion.map((seccion: Seccion) => (
              <AccordionItem key={seccion.id} value={seccion.id}>
                <AccordionTrigger
                  className={`bg-primary-900 justify-end mb-0.5 px-4 flex-row-reverse py-3 text-white-main rounded-t-main text-lg w-full ${
                    seccion.id === dataClase.seccionId
                      ? "opacity-100"
                      : "opacity-80"
                  }`}
                >
                  {seccion.nombre}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc  space-y-2 py-3 px-5 pl-8  text-base">
                    {seccion.clases.map((item: Clase, index) => (
                      <li key={index} className="flex justify-between">
                        <span
                          className={`${
                            item.id === dataClase.id ? "text-primary-main" : ""
                          }`}
                        >
                          {item.nombre}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.duracion}
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
  );
};
