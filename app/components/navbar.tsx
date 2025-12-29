import Link from "next/link";
import DesktopLogo from '../../public/airbnb-desktop.png'
import MobileLogo from '../../public/airbnb-mobile.webp'
import Image from "next/image";
import UserNav from "./userNav";
import Search from "./Search";

export default function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="container flex items-center justify-between px-5 py-5 mx-auto lg:px-10">
                <Link href={'/'}>
                    <Image src={DesktopLogo} alt="Desktop Logo" className="hidden w-32 lg:block" />
                    <Image src={MobileLogo} alt="Mobile Logo" className="block w-12 lg:hidden" />
                </Link>

                <Search />
                
                <UserNav />
            </div>
        </nav>
    )
}