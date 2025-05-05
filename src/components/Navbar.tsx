import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/Context/theme-provider";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const Navbar = () => {
  const token = Cookies.get("token");
  const { setTheme, theme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/auth");
  };
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center py-4 p-2">
        <div className="hidden md:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={setTheme}>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p className="">{theme}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {token && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLogout}
                    className="ml-2"
                  >
                    <LogOut className="h-[1.2rem] w-[1.2rem] " />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p className="">Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {token && (
          <>
            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList className="!gap-7">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/my-urls">My URLs</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/saved">Saved</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </>
        )}
        <div className="md:hidden ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ml-2">
              {token && (
                <>
                  {" "}
                  <DropdownMenuLabel>
                    {" "}
                    <a href="/" className="text-sm hover:underline">
                      Home
                    </a>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    {" "}
                    <a href="/app/my-urls" className="text-sm hover:underline">
                      My URLs
                    </a>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    {" "}
                    <a href="/app/saved" className="text-sm hover:underline">
                      Saved
                    </a>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuLabel
                onClick={setTheme}
                className="flex items-center justify-between"
              >
                {theme === "light" ? "Dark" : "Light"}
                <>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden dark:block" />
                  <Moon className=" h-[1.2rem] w-[1.2rem]  transition-all   dark:hidden" />
                </>
              </DropdownMenuLabel>
              {token && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel
                    onClick={handleLogout}
                    className="flex items-center justify-between"
                  >
                    Logout
                    <LogOut className="h-[1.2rem] w-[1.2rem] " />
                  </DropdownMenuLabel>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-[var(--foreground)]">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1023.8"
              enableBackground="new 0 0 1000 1023.8"
              xmlSpace="preserve"
              className="injected-svg p-0"
              data-src="https://cdn.molhamteam.com/assets/logo/logo-main.svg"
              role="img"
              width="36px"
              height="36px"
              fill="currentColor"
              strokeWidth="70"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="st0"
                d="M495.8,564.2c0.4-15.3,8.3-26.3,20.5-35.3c3.7-2.7,7.7-3.8,12.1-3.4c5.2,0.5,10.3,1.6,14.9,4.4  c9.4,5.7,16.3,13.4,21.2,22.9c3.6,7,6.2,14.2,8,21.8c1.1,4.7,1.4,9.4,0.3,14.1c-2.3,9-5.5,17.4-11.6,24.9  c-7.2,8.9-21.4,12.2-32.6,6.5c-4.6-2.3-9.2-5.1-12.9-8.6c-8.9-8.5-15.5-18.5-17.4-30.7C497.4,575.3,496.6,569.7,495.8,564.2  L495.8,564.2L495.8,564.2z"
              ></path>
              <path
                className="st0"
                d="M117,699.8c0,0-9-201.5,198.9-241.8C315.9,458,337,630.9,117,699.8C117,699.8,117,699.8,117,699.8z"
              ></path>
              <path
                className="st0"
                d="M117,699.8c0,0-14.6-197.6,198.9-241.8C315.9,458,242.7,631.8,117,699.8C117,699.8,117,699.8,117,699.8z"
              ></path>
              <path
                className="st0"
                d="M0,482.7c0,0,93.5-178.7,293.5-109.1C293.5,373.6,224.8,533.7,0,482.7L0,482.7z"
              ></path>
              <path
                className="st0"
                d="M0,482.7c0,0,86.7-178.1,293.5-109.1C293.5,373.6,142.8,487.2,0,482.7L0,482.7z"
              ></path>
              <path
                className="st0"
                d="M107.5,237.8c0,0,158.8-85.2,271.7,66.6C379.2,304.4,248.1,388.3,107.5,237.8L107.5,237.8L107.5,237.8z"
              ></path>
              <path
                className="st0"
                d="M107.5,237.8c0,0,153.5-88.2,271.7,66.6C379.2,304.4,210.9,312.8,107.5,237.8L107.5,237.8L107.5,237.8z"
              ></path>
              <path
                className="st0"
                d="M281.5,0c0,0,182.3,74.8,132.6,275.6C414.1,275.6,252.3,223.3,281.5,0L281.5,0L281.5,0z"
              ></path>
              <path
                className="st0"
                d="M281.5,0c0,0,181.1,68.3,132.6,275.6C414.1,275.6,290.1,139.3,281.5,0L281.5,0L281.5,0z"
              ></path>
              <path
                className="st0"
                d="M645.1,18.3c0,0,16.7,196.3-184.5,243.9C460.6,262.1,433.1,94.3,645.1,18.3L645.1,18.3L645.1,18.3z"
              ></path>
              <path
                className="st0"
                d="M645.1,18.3c0,0,22,192.2-184.5,243.9C460.6,262.1,525.1,89.6,645.1,18.3L645.1,18.3L645.1,18.3z"
              ></path>
              <path
                className="st0"
                d="M769.5,138c0,0-23.2,195.7-229.9,201.6C539.5,339.6,546.5,169.6,769.5,138L769.5,138L769.5,138z"
              ></path>
              <path
                className="st0"
                d="M769.5,138c0,0-17.3,192.7-229.9,201.6C539.5,339.6,637.5,183.6,769.5,138L769.5,138L769.5,138z"
              ></path>
              <path
                className="st0"
                d="M970.2,275.3c0,0-119.8,156.4-300.6,56C669.6,331.3,762.3,188.8,970.2,275.3L970.2,275.3z"
              ></path>
              <path
                className="st0"
                d="M970.2,275.3c0,0-113.2,157-300.6,56C669.6,331.3,833.5,247.2,970.2,275.3L970.2,275.3z"
              ></path>
              <path
                className="st0"
                d="M1000,420.3c0,0-103.7,96.6-219.9,3.7C780.1,423.9,862.9,333.9,1000,420.3L1000,420.3z"
              ></path>
              <path
                className="st0"
                d="M1000,420.3c0,0-99.1,97.8-219.9,3.7C780.1,423.9,906.4,383.9,1000,420.3L1000,420.3z"
              ></path>
              <path
                className="st0"
                d="M655,368.6c0,0,22.8,105.1-82.9,145C572,513.6,545.5,424.6,655,368.6L655,368.6z"
              ></path>
              <path
                className="st0"
                d="M655,368.6c0,0,25.4,102.6-82.9,145C572,513.6,594.9,415.6,655,368.6L655,368.6z"
              ></path>
              <path
                className="st0"
                d="M475.5,274.6c0,0,66.4,92.8-19.8,176C455.7,450.6,392.4,375.1,475.5,274.6L475.5,274.6z"
              ></path>
              <path
                className="st0"
                d="M475.5,274.6c0,0,67.8,89.2-19.8,176C455.7,450.6,436.9,345.6,475.5,274.6L475.5,274.6z"
              ></path>
              <path
                className="st0"
                d="M317.9,422.9c0,0,114-4.8,136.5,112.8C454.4,535.7,356.6,547.4,317.9,422.9L317.9,422.9z"
              ></path>
              <path
                className="st0"
                d="M317.9,422.9c0,0,111.8-8,136.5,112.8C454.4,535.7,356.2,494.1,317.9,422.9L317.9,422.9z"
              ></path>
              <path
                className="st0"
                d="M746.5,388.4c-58.8,57.9-246.2,279.2-95,632.2c2.3,5.3,10.3,3.5,10-2.3C656.2,931.2,651,665.5,755,394  c1.5-3.8-1.6-7.1-4.8-7.1C748.9,386.9,747.6,387.4,746.5,388.4L746.5,388.4L746.5,388.4z"
              ></path>
              <path
                className="st0"
                d="M308.9,606.1c97.6,39,294.3,150.8,235.5,405c-1.7,7.3,8.6,10.7,11.7,3.9c52.2-116.8,121-372.1-244-420.7  c-0.3,0-0.6-0.1-1-0.1C304.6,594.2,302.4,603.5,308.9,606.1L308.9,606.1z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <hr className=" border-blueGray-300" />
    </header>
  );
};

export default Navbar;
