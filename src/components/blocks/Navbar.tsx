import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Link } from "react-router-dom";
import AuthDialogs from "./AuthDialogs";

const navigation: { name: string; href: string }[] = [
  { name: "Colleges", href: "/colleges" },
  { name: "Posts", href: "/posts" },
  { name: "Search", href: "/search" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="font-bold text-indigo-500 dark:text-indigo-300 text-lg">
              Hush
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <nav className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <ModeToggle />
          <AuthDialogs />
        </div>
      </nav>
      {/* Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="flex flex-col gap-4 p-4 -m-4">
                <a href="#" className="font-bold text-left">
                  Hush
                </a>
                <ModeToggle />
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Sidebar End*/}
    </header>
  );
}

export default Navbar;
