import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Newspaper, School, Search } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserId } from "@/features/user/userSlice";
import useLogout from "@/hooks/useLogout";
import { useLocation } from "react-router-dom";

const navigation: { name: string; href: string; icon: any }[] = [
  { name: "Colleges", href: "/colleges", icon: <School size={15} /> },
  { name: "Posts", href: "/posts", icon: <Newspaper size={15} /> },
  { name: "Search", href: "/search", icon: <Search size={15} /> },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUserLoggedIn = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const [blackenStyle, setBlackenStyle] = useState("");
  const logout = useLogout();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 75) {
        setBlackenStyle("bg-white dark:bg-black");
      } else {
        setBlackenStyle("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-opacity-80 backdrop-blur-sm ${blackenStyle}`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-8 py-3"
      >
        <div className="flex">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="font-bold text-indigo-500 dark:text-indigo-300 text-lg">
              Hush
            </span>
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden md:flex justify-end gap-4 items-center">
          <nav className="flex gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-label={item.name}
                onClick={handleLinkClick}
                className={`flex flex-col max-w-10 items-center gap-1 text-xs rounded-md text-gray-900 py-1 px-10 dark:text-gray-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
                  currentPath === item.href
                    ? "bg-neutral-200 dark:bg-neutral-700"
                    : ""
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <ModeToggle />
          {isUserLoggedIn ? (
            <Link to={`/user/${userId}`} className="flex gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button onClick={logout} variant={"destructive"}>
                Logout
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to={"/login"}>
                <Button variant={"outline"} className="bg-none">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-indigo-500 hover:bg-indigo-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent aria-describedby={undefined}>
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
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={`-mx-3 flex gap-2 items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      currentPath === item.href ? "bg-gray-200" : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-4">
                {isUserLoggedIn ? (
                  <div className="flex flex-col items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User Avatar"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button
                      onClick={logout}
                      variant={"destructive"}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to={"/login"} onClick={handleLinkClick}>
                      <Button variant={"outline"} className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to={"/signup"} onClick={handleLinkClick}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Sidebar End */}
    </header>
  );
}

export default Navbar;
