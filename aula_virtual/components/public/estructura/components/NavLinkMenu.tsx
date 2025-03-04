import Link from "next/link";

export const NavLinkMenu = ({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick: () => void;
}) => (
  <Link
    onClick={onClick}
    href={href}
    className="text-lg font-medium text-white relative transition-all  hover:text-green-500 hover:tracking-wider before:content-[''] before:absolute before:w-0 before:top-full before:h-[2px] before:left-0 before:bg-green-500 before:transition-all before:duration-200 hover:before:w-full"
  >
    {text}
  </Link>
);
