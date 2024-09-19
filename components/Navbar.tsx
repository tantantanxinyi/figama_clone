"use client";

import Image from "next/image";
import { memo } from "react";
import { NavbarProps } from "@/types/type";
import ActiveUsers from "./users/ActiveUser";

const Navbar = ({ activeElement }: NavbarProps) => {
  return (
    <nav
      className="flex select-none 
      items-center
      justify-between
      gap-4 bg-primary px-5 text-white"
    >
      <Image src="/assets/logo.png" alt="FigPro Logo" width={58} height={20}>
        <ActiveUsers />
      </Image>
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
