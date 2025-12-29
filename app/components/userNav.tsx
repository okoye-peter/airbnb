import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { createAirbnbHome } from "../actions";

export default async function UserNav() {
    const { getUser } = await getKindeServerSession();
    const user = await getUser()
    const createAirbnbHomeWithUserId = createAirbnbHome.bind(null, {userId:  user?.id as string})

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center px-2 py-2 border rounded-full lg:px-4 lg:py-2 gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img src={user?.picture ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt="Image of the user" className="hidden w-8 h-8 rounded-full lg:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {
                    user ?
                        <>
                            <DropdownMenuItem>
                                <form action={createAirbnbHomeWithUserId} className="'w-full">
                                    <button type="submit" className="w-full">
                                        Airbnb your Home
                                    </button>
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/my-homes">My Listings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/favorites">My Favorite</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/reservations">My Reservations</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogoutLink>Logout</LogoutLink>
                            </DropdownMenuItem>
                        </>
                        :
                        <>
                            <DropdownMenuItem>
                                <RegisterLink className="w-full">Register</RegisterLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LoginLink className="w-full">Login</LoginLink>
                            </DropdownMenuItem>
                        </>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}