
"use client";

import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between items-center shadow-sm bg-white px-5 pb-5 pt-10">
    <div>
        <div className="flex items-center gap-3">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
          />
          <h1 className="hidden md:block">BookWise</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route} className="flex items-center gap-3">
                <div
                  className={cn(
                    "link flex items-center justify-center  rounded-full w-10 h-10",
                    isSelected && "bg-gray-900 text-black",
                  )}
                >
                  <div className="relative size-5 ">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""}  object-contain`}
                    />
                  </div>

                </div>
                  <p className={cn("hidden md:block",isSelected ? "text-black" : "text-dark")}>
                    {link.text}
                  </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
