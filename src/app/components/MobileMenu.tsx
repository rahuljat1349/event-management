"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {  Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ToggleThemeButton } from "./ThemeToggleButton";

interface NavItem {
    id: number;
    link: string;
    text: string;
    icon:ReactNode;
}

interface MobileMenuProps {
    navItems: NavItem[],
    isSession: boolean
}

const MobileMenu = ({ navItems, isSession }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = () => setIsOpen(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <div className="text-black cursor-pointer">
                    <Menu className="size-8 dark:text-white" />
                </div>
            </SheetTrigger>

            <SheetContent className="w-[300px]">
                <ul className="flex flex-col pt-5 items-start gap-[20px]">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link href={item.link} onClick={closeSheet} className="flex items-center text-[#212121] dark:text-white">
                            <span className={`text-[#90A4AE] mr-2  dark:text-[#a1a1aa]`}>{item.icon}</span>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                {isSession && <>
                    <div className="flex sm:hidden flex-col gap-5 mt-5 ">
                        <Link href={"/signin"} onClick={closeSheet}>
                            <Button
                                className=" border border-gray-400 dark:bg-white bg-white text-black dark:text-black hover:text-black no-underline hover:no-underline"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href={"/signup"} onClick={closeSheet}>
                            <Button
                                variant={"black"}
                                className="dark:border"
                            >
                                SignUp
                            </Button>
                        </Link>
                    </div>
                </>}
                <div className="mt-5">
                    <ToggleThemeButton />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
