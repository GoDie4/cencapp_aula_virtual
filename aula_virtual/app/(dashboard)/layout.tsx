import { ProviderAula } from "./@components/ProviderAula";

export default function AulaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProviderAula>{children}</ProviderAula>;
}
