/* eslint-disable @next/next/no-img-element */
import { AulaMetadata } from "@/seo/aula/AulaMetaData";
import { FaBook, FaClipboardCheck, FaMedal } from "react-icons/fa";
import { AulaMain } from "../@components/estructura/AulaMain";
/*
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
*/
export function generateMetadata() {
  const metadata = AulaMetadata();
  return metadata;
}

interface StatCard {
  title: string;
  value: number;
  titleSeccion: string;
  icon: React.ReactNode;
  color: string;
}
export default function Aula() {
  const stats: StatCard[] = [
    {
      title: "Total de Cursos",
      value: 4,
      titleSeccion: "Cursos",
      icon: <FaBook size={24} />,
      color: "bg-primary-900",
    },
    {
      title: "Exámenes Pendientes",
      value: 2,
      titleSeccion: "Exámenes",
      icon: <FaClipboardCheck size={24} />,
      color: "bg-primary-900",
    },
    {
      title: "Certificados",
      value: 3,
      titleSeccion: "Certificados",
      icon: <FaMedal size={24} />,
      color: "bg-primary-900",
    },
  ];

  return (
    <>
      <header className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <AulaMain />
          <div className="mt-4 md:mt-0">
            <img
              src="/assets/images/logo/logo.png"
              alt="Logo del aula"
              className="block h-20 w-20 object-contain  rounded-full p-2 border-4 border-blue-500"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white-main rounded-lg shadow-lg overflow-hidden"
          >
            <div
              className={`${stat.color} p-4 flex items-center gap-2 justify-center text-white-main text-center`}
            >
              <span className="text-3xl text-center">{stat.icon}</span>
              <p>{stat.titleSeccion}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
