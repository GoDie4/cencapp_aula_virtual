import { FooterLayout } from "@/layouts/FooterLayout";
import { HeaderLayout } from "@/layouts/HeaderLayout";

/*
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
})
*/
/*
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </>
  );
}
