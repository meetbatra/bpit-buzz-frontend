import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/user/store/user-store";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gray-300 h-[4rem] flex border-b border-black">
            <NavigationMenu className="list-none w-full max-w-screen">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="hover:bg-transparent focus:bg-transparent">
                        <Link to="/"><img src={logo} alt="BPIT Buzz logo" className="h-12 w-auto" /></Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <div className="mr-2 ml-auto flex gap-1 justify-end">
                    {!isAuthenticated ? (
                    <>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/login" className="text-[1.1rem] hover:bg-gray-200 p-[0.3rem]">Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/signup" className="text-[1.1rem] hover:bg-gray-200 p-[0.3rem]">SignUp</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                    ) : (
                        <div className="ml-auto">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="p-1 flex gap-1 rounded-l-full rounded-r-full">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                                    />
                                    <h3 className="text-[1rem]">{user?.name}</h3>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-[9.5rem]">
                                        <li className="w-full flex gap-1 flex-col">
                                            <NavigationMenuLink asChild>
                                                <Link to={user?.role === 'admin' ? "/admin" : "/dashboard"} >Dashboard</Link> 
                                            </NavigationMenuLink>
                                            <Button
                                                className="w-full cursor-pointer"
                                                onClick={() => {
                                                    logout();
                                                    navigate("/");
                                                }}
                                            >
                                                Logout
                                            </Button>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </div>
                    )}
                </div>
            </NavigationMenu>
        </div>
    )
}

export default Header;