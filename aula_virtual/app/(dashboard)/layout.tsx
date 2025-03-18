import { DialogResponsiveProvider } from "@/context/DialogResponsive";
import { ProviderAula } from "./@components/ProviderAula";

export default function AulaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderAula>
      <DialogResponsiveProvider>
        {children}
      </DialogResponsiveProvider>
    </ProviderAula>
  );
}
