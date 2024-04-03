import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { HelpCircle, Settings } from "lucide-react";
import UserBox from "./user-box";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="h-[10vh] fixed left-0 top-0 right-0 z-30 bg-[#f6f9fc] dark:bg-[#1F1F1F]">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            <span className="pl-2 text-[22px] opacity-75"></span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div className="pl-2 text-[22px] opacity-75">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="pl-2 text-[22px] opacity-75">
            <Settings className="w-5 h-5" />
          </div>
          {userId ? (
            <UserBox />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
