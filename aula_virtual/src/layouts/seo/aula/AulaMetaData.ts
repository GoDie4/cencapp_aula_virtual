export function AulaMetadata({ title }: { title: string }) {
  return {
    title: `${title} | Aula Virtual | Cencap Perú`,
    generator: "Next.js",
    robots: "noindex,nofollow",
    authors: [{ name: "Logos Perú" }],
    icons: {
      icon: "/assets/images/logo/ico.png",
    },
  };
}
